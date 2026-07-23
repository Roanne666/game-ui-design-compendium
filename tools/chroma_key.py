from PIL import Image
from pathlib import Path


def chroma_to_rgba(src, dst, tol=55):
    im = Image.open(src).convert("RGBA")
    pix = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pix[x, y]
            if g > 140 and g > r + 40 and g > b + 40:
                pix[x, y] = (r, g, b, 0)
                continue
            if r > 200 and g > 200 and b > 200:
                pix[x, y] = (r, g, b, 0)
                continue
            dg = g - max(r, b)
            if g > 100 and dg > 25:
                alpha = max(0, min(255, int(255 * (1 - (dg - 25) / tol))))
                pix[x, y] = (r, g, b, alpha)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save(dst)
    print(dst, im.size, im.mode, "corner", im.getpixel((0, 0)))


out = Path("demo/scenes/01-cyberpunk-hud/art")
assets = Path(r"C:\Users\a2753\.cursor\projects\d-Projects-Skills-UI\assets")
chroma_to_rgba(assets / "guard-chroma.png", out / "guard.png")
chroma_to_rgba(assets / "civ-chroma.png", out / "civ.png")
