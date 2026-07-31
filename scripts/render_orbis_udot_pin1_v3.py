from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
CASE = ROOT / "production" / "orbis-u-dot-trial"
OUT = ROOT / "public" / "pins" / "orbis-u-dot-trial-v3-01.png"

W, H = 1000, 1500
NAVY = "#202b43"
BURGUNDY = "#a51f46"
IVORY = "#fbf6f1"
MUTED = "#5c6473"
WHITE = "#ffffff"

MINCHO = r"C:\Windows\Fonts\yumin.ttf"
MINCHO_B = r"C:\Windows\Fonts\yumindb.ttf"
GOTHIC = r"C:\Windows\Fonts\YuGothM.ttc"
GOTHIC_B = r"C:\Windows\Fonts\YuGothB.ttc"
GEORGIA = r"C:\Windows\Fonts\georgia.ttf"


def f(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def contain(image: Image.Image, width: int, height: int) -> Image.Image:
    ratio = min(width / image.width, height / image.height)
    return image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)


def spaced(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str,
           typeface: ImageFont.FreeTypeFont, fill: str, spacing: int) -> None:
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=typeface, fill=fill)
        box = draw.textbbox((x, y), char, font=typeface)
        x += box[2] - box[0] + spacing


def main() -> None:
    base_path = CASE / "pin-01-base-v3.png"
    product_path = ROOT / "public/assets/products/orbis-u-dot-trial/official-limited-set.jpg"

    with Image.open(base_path) as source:
        if source.size != (1024, 1536):
            raise RuntimeError(f"Unexpected base size: {source.size}")
        canvas = source.convert("RGB").resize((W, H), Image.Resampling.LANCZOS).convert("RGBA")

    draw = ImageDraw.Draw(canvas)

    # Copy is placed directly on the naturally bright background. No haze,
    # blur, gradient, or translucent panel is added over the person.
    spaced(draw, (48, 34), "MY SKIN EDIT", f(GEORGIA, 28), NAVY, 4)
    spaced(draw, (50, 74), "肌に、いいほう。", f(GOTHIC, 15), MUTED, 1)
    draw.line((50, 117, 130, 117), fill=BURGUNDY, width=2)
    spaced(draw, (50, 154), "40代からのスキンケア", f(GOTHIC_B, 17), BURGUNDY, 0)
    draw.text((48, 205), "いきなり本品は", font=f(MINCHO, 43), fill=NAVY)
    draw.text((48, 270), "迷う。", font=f(MINCHO_B, 68), fill=BURGUNDY)
    draw.text((50, 375), "まず7日間、朝晩の", font=f(MINCHO, 19), fill=NAVY)
    draw.text((50, 410), "3ステップを試す。", font=f(MINCHO, 19), fill=NAVY)
    draw.rectangle((50, 474, 304, 536), fill=BURGUNDY)
    draw.text((75, 490), "セット内容を見る  →", font=f(GOTHIC_B, 18), fill=WHITE)

    # Dense lower offer band: original product image is scaled in full, never cropped.
    band_top, band_bottom = 1060, 1450
    draw.rectangle((0, band_top, W, band_bottom), fill=IVORY)
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rectangle((34, band_top + 35, 555, band_bottom - 22), fill=(32, 43, 67, 46))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    canvas.alpha_composite(shadow)
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((28, band_top + 22, 549, band_bottom - 34), fill=WHITE, outline="#efe7e1", width=4)

    with Image.open(product_path) as source:
        source_size = source.size
        product = contain(source.convert("RGB"), 485, 330)
    px = 28 + (521 - product.width) // 2
    py = band_top + 22 + (356 - product.height) // 2
    canvas.alpha_composite(product.convert("RGBA"), (px, py))

    draw = ImageDraw.Draw(canvas)
    draw.text((594, 1100), "初回限定", font=f(GOTHIC_B, 20), fill=BURGUNDY)
    draw.text((586, 1146), "980", font=f(GEORGIA, 92), fill=BURGUNDY)
    draw.text((814, 1210), "円（税込）", font=f(GOTHIC_B, 19), fill=NAVY)
    draw.line((590, 1268, 930, 1268), fill="#d7c7c9", width=2)
    draw.text((594, 1300), "送料無料", font=f(GOTHIC_B, 22), fill=NAVY)
    draw.text((594, 1342), "定期購入ではありません", font=f(GOTHIC, 17), fill=NAVY)
    draw.text((801, 1466), "PR / AI MODEL", font=f(GOTHIC_B, 15), fill=MUTED)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUT, "PNG", optimize=True)

    with Image.open(OUT) as final:
        if final.size != (W, H):
            raise RuntimeError(f"Wrong output size: {final.size}")

    print(f"output={OUT}")
    print(f"size={W}x{H}")
    print(f"base={base_path.name}:1024x1536")
    print(f"product={product_path.name}:{source_size[0]}x{source_size[1]} crop=none")
    print(f"product_rect={px},{py},{px + product.width},{py + product.height}")


if __name__ == "__main__":
    main()
