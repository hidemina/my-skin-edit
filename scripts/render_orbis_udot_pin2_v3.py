from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
CASE = ROOT / "production" / "orbis-u-dot-trial"
OUT = ROOT / "public" / "pins" / "orbis-u-dot-trial-v3-02.png"

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
    base_path = CASE / "pin-02-base-v3.png"
    product_path = ROOT / "public/assets/products/orbis-u-dot-trial/official-set-main.jpg"

    with Image.open(base_path) as source:
        if source.size != (1024, 1536):
            raise RuntimeError(f"Unexpected base size: {source.size}")
        canvas = source.convert("RGB").resize((W, H), Image.Resampling.LANCZOS).convert("RGBA")

    draw = ImageDraw.Draw(canvas)

    # Right-side copy sits on the real bathroom background; no blur, haze,
    # gradient, or translucent text panel is used anywhere over the person.
    spaced(draw, (650, 34), "MY SKIN EDIT", f(GEORGIA, 25), NAVY, 3)
    spaced(draw, (652, 72), "肌に、いいほう。", f(GOTHIC, 14), MUTED, 1)
    draw.line((652, 114, 732, 114), fill=BURGUNDY, width=2)
    draw.text((650, 150), "化粧水だけ変える前に", font=f(GOTHIC_B, 15), fill=BURGUNDY,
              stroke_width=1, stroke_fill="#eef4f5")
    draw.text((648, 205), "洗う・", font=f(MINCHO, 41), fill=NAVY, stroke_width=1, stroke_fill="#f3f7f7")
    draw.text((648, 260), "うるおす・", font=f(MINCHO, 41), fill=NAVY, stroke_width=1, stroke_fill="#f3f7f7")
    draw.text((648, 315), "保湿する", font=f(MINCHO, 41), fill=NAVY, stroke_width=1, stroke_fill="#f3f7f7")
    draw.text((646, 385), "3ステップ", font=f(MINCHO_B, 51), fill=BURGUNDY,
              stroke_width=1, stroke_fill="#f7f0f1")
    draw.text((646, 452), "7日分", font=f(MINCHO_B, 68), fill=BURGUNDY,
              stroke_width=1, stroke_fill="#f7f0f1")
    draw.text((650, 555), "朝晩の使い方まで、", font=f(MINCHO, 16), fill=NAVY,
              stroke_width=1, stroke_fill="#f3f7f7")
    draw.text((650, 586), "自分の生活で試す。", font=f(MINCHO, 16), fill=NAVY,
              stroke_width=1, stroke_fill="#f3f7f7")
    draw.rectangle((650, 645, 948, 707), fill=BURGUNDY)
    draw.text((672, 661), "7日間セットを確認  →", font=f(GOTHIC_B, 17), fill=WHITE)

    band_top, band_bottom = 1060, 1450
    draw.rectangle((0, band_top, W, band_bottom), fill=IVORY)
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rectangle((34, band_top + 35, 506, band_bottom - 22), fill=(32, 43, 67, 46))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    canvas.alpha_composite(shadow)
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((28, band_top + 22, 500, band_bottom - 34), fill=WHITE, outline="#e4eaec", width=4)

    with Image.open(product_path) as source:
        source_size = source.size
        product = contain(source.convert("RGB"), 430, 340)
    px = 28 + (472 - product.width) // 2
    py = band_top + 22 + (356 - product.height) // 2
    canvas.alpha_composite(product.convert("RGBA"), (px, py))

    draw = ImageDraw.Draw(canvas)
    draw.text((548, 1102), "豪華7日間", font=f(MINCHO_B, 48), fill=BURGUNDY)
    draw.text((548, 1165), "トライアルキット", font=f(MINCHO, 31), fill=NAVY)
    draw.line((550, 1235, 936, 1235), fill="#c7d2d6", width=2)
    draw.text((550, 1272), "洗顔料・化粧水・保湿クリーム", font=f(GOTHIC_B, 17), fill=NAVY)
    draw.text((550, 1320), "まずは朝晩3ステップから", font=f(GOTHIC, 18), fill=NAVY)
    draw.text((798, 1414), "PR / AI MODEL", font=f(GOTHIC_B, 15), fill=MUTED)

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
