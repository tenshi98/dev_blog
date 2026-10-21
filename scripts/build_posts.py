#!/usr/bin/env python3
"""Genera post/posts.json a partir de los archivos Markdown de post/."""

from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "post"
OUTPUT = POSTS_DIR / "posts.json"
EXCERPT_LENGTH = 200

FRONT_MATTER_RE = re.compile(r"^---\s*\n([\s\S]*?)\n---\s*\n")
FILENAME_RE = re.compile(r"^(\d{8})-(.+)\.md$")
H1_RE = re.compile(r"^#\s+(.+)$", re.MULTILINE)
SIMPLE_PROPERTY_RE = re.compile(r"^(\w[\w-]*):\s*(.+)$")
LIST_PROPERTY_RE = re.compile(r"^(\w[\w-]*):\s*$")
LIST_ITEM_RE = re.compile(r"^\s+-\s+(.+)$")


def parse_front_matter(text: str) -> tuple[dict, str]:
    match = FRONT_MATTER_RE.match(text)
    if not match:
        return {}, text

    metadata: dict = {}
    current_key = None

    for line in match.group(1).splitlines():
        simple = SIMPLE_PROPERTY_RE.match(line)
        if simple:
            current_key = simple.group(1)
            metadata[current_key] = simple.group(2).strip()
            continue

        list_start = LIST_PROPERTY_RE.match(line)
        if list_start:
            current_key = list_start.group(1)
            metadata[current_key] = []
            continue

        item = LIST_ITEM_RE.match(line)
        if item and current_key and isinstance(metadata.get(current_key), list):
            metadata[current_key].append(item.group(1).strip())

    return metadata, text[match.end():]


def normalize_tags(value) -> list[str]:
    if isinstance(value, str):
        raw = value.strip()
        if raw.startswith("[") and raw.endswith("]"):
            raw = raw[1:-1]
        return [tag.strip().strip('"').strip("'") for tag in raw.split(",") if tag.strip()]
    if isinstance(value, list):
        return [str(tag).strip().strip('"').strip("'") for tag in value if str(tag).strip()]
    return []


def strip_inline_markdown(text: str) -> str:
    text = re.sub(r"!\[([^\]]*)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[*_~#>|]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def truncate(text: str, max_length: int = EXCERPT_LENGTH) -> str:
    if len(text) <= max_length:
        return text
    return text[:max_length].rstrip() + "…"


def extract_excerpt(metadata: dict, body: str) -> str:
    description = metadata.get("description")
    if isinstance(description, str) and description.strip():
        return truncate(strip_inline_markdown(description))

    for block in re.split(r"\n\s*\n", body):
        stripped = block.strip()
        if not stripped:
            continue

        first_line = stripped.splitlines()[0].strip()
        if re.match(r"^(#{1,6}\s|[-*+]\s|\d+\.\s|>|\||```|~~~|<|[-*_]{3,}\s*$)", first_line):
            continue

        text = strip_inline_markdown(stripped)
        if text:
            return truncate(text)

    return ""


def extract_title(metadata: dict, body: str) -> str:
    title = metadata.get("title")
    if isinstance(title, str) and title.strip():
        return title.strip()

    heading = H1_RE.search(body)
    if heading:
        return strip_inline_markdown(heading.group(1))

    return "Sin título"


def parse_date(filename: str) -> str | None:
    match = FILENAME_RE.match(filename)
    if not match:
        return None

    raw = match.group(1)
    try:
        date(int(raw[:4]), int(raw[4:6]), int(raw[6:8]))
    except ValueError:
        return None

    return f"{raw[:4]}-{raw[4:6]}-{raw[6:8]}"


def build_post(path: Path) -> dict | None:
    filename = path.name
    post_date = parse_date(filename)
    if post_date is None:
        print(f"Omitido (nombre no válido): {filename}", file=sys.stderr)
        return None

    text = path.read_text(encoding="utf-8")
    metadata, body = parse_front_matter(text)

    post = {
        "filename": filename,
        "title": extract_title(metadata, body),
        "excerpt": extract_excerpt(metadata, body),
        "tags": normalize_tags(metadata.get("tags")),
        "date": post_date,
        "content": body,
    }

    if post["title"] == "Sin título":
        print(f"Aviso (sin título): {filename}", file=sys.stderr)

    return post


def main() -> int:
    if not POSTS_DIR.is_dir():
        print(f"No existe el directorio {POSTS_DIR}", file=sys.stderr)
        return 1

    posts = []
    for path in sorted(POSTS_DIR.glob("*.md")):
        post = build_post(path)
        if post is not None:
            posts.append(post)

    posts.sort(key=lambda item: (item["date"], item["filename"]), reverse=True)

    payload = {"version": 1, "posts": posts}
    OUTPUT.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Generado {OUTPUT.relative_to(ROOT)} con {len(posts)} publicaciones.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
