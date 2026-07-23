"""Remove background by flood-filling from corners (black or green screens)."""
from __future__ import annotations
import sys
from collections import deque
from pathlib import Path

from PIL import Image


def near_key(r: int, g: int, b: int) -> bool:
    if g > 140 and g > r + 50 and g > b + 50:
        return True
    if r < 28 and g < 28 and b < 28:
        return True
    return False


def flood_key(src: Path, dst: Path) -> None:
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()
    seen = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def try_push(x: int, y: int) -> None:
        if x < 0 or y < 0 or x >= w or y >= h or seen[y][x]:
            return
        r, g, b, a = px[x, y]
        if near_key(r, g, b):
            seen[y][x] = True
            q.append((x, y))

    for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (0, h // 2)):
        try_push(x, y)

    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            try_push(nx, ny)

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if near_key(r, g, b):
                px[x, y] = (r, g, b, 0)

    im.save(dst)
    print(f"wrote {dst} ({w}x{h})")


if __name__ == "__main__":
    flood_key(Path(sys.argv[1]), Path(sys.argv[2]))
