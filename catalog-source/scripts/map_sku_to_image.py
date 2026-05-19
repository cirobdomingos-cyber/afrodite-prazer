"""
Build SKU -> image mapping using BOTH:
  A) Geometric nearest-image-to-SKU on inner pages (1-77)  -> "hero" image
  B) Same on the back-of-book price-list pages (78-87)     -> "thumb" image

Outputs:
  catalog-source/images_by_sku/{SKU}_hero.png
  catalog-source/images_by_sku/{SKU}_thumb.png
  catalog-source/data/products.json   (rewritten with image paths added)
  catalog-source/data/mapping_review.html  (visual QA page)
  catalog-source/data/mapping_unmatched.json (SKUs with no match in either source)
"""

import json
import re
import math
import pathlib

import pymupdf

PDF = pathlib.Path(r"c:/repo/afrodite-prazer/Catalogo-A-Sos-Sensual-1-Edicao-Com-Preco-2026.pdf")
ROOT = pathlib.Path(r"c:/repo/afrodite-prazer/catalog-source")
DATA_DIR = ROOT / "data"
SKU_DIR = ROOT / "images_by_sku"
SKU_DIR.mkdir(parents=True, exist_ok=True)

SKU_RE = re.compile(r"\b([A-Z]{2,3}\d{2,4}[A-Z]{0,3})\b")
PRICE_LIST_PAGE_START = 78  # 1-indexed; pages 78..end of doc are the master price list

# minimum image dims to consider — filter out icon-sized decorations only
# (in PDF units; product photos can be skinny tubes ~30 wide)
MIN_W, MIN_H = 25, 25


def page_extractions(page):
    """Return (sku_spans, image_blocks) for one page.
    sku_spans: list of dict(sku, bbox, cx, cy)
    image_blocks: list of dict(xref, bbox, cx, cy, w, h)
    """
    skus = []
    text = page.get_text("dict")
    for block in text.get("blocks", []):
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                t = span.get("text", "")
                for m in SKU_RE.finditer(t):
                    sku = m.group(1)
                    x0, y0, x1, y1 = span["bbox"]
                    skus.append({
                        "sku": sku,
                        "bbox": (x0, y0, x1, y1),
                        "cx": (x0 + x1) / 2,
                        "cy": (y0 + y1) / 2,
                    })

    images = []
    for info in page.get_image_info(xrefs=True):
        x0, y0, x1, y1 = info["bbox"]
        w, h = x1 - x0, y1 - y0
        if w < MIN_W or h < MIN_H:
            continue
        images.append({
            "xref": info["xref"],
            "bbox": (x0, y0, x1, y1),
            "cx": (x0 + x1) / 2,
            "cy": (y0 + y1) / 2,
            "w": w,
            "h": h,
        })
    return skus, images


def assign_nearest(skus, images, page_w, page_h):
    """For each SKU, pick the nearest image. Bias upward (image usually sits above the
    SKU label on a product card). Returns dict {sku -> image_dict or None}.

    Heuristic:
      - Compute weighted distance from sku center to image center.
      - y-distance is weighted 0.6 (boxes stack vertically -> closer is more meaningful);
        x-distance weighted 1.0.
      - Strong preference for images that sit ABOVE the sku (product photo above its label).
        We add a 30% penalty to images whose center is BELOW the sku center.
      - If the nearest image's normalised distance > 0.5 of page diagonal, we treat as no match.
    """
    if not skus or not images:
        return {s["sku"]: None for s in skus}

    diag = math.hypot(page_w, page_h)
    out = {}
    for s in skus:
        best = None
        best_d = float("inf")
        for img in images:
            dx = (img["cx"] - s["cx"]) * 1.0
            dy = (img["cy"] - s["cy"]) * 0.6
            d = math.hypot(dx, dy)
            if img["cy"] > s["cy"]:  # image below sku — penalise
                d *= 1.30
            if d < best_d:
                best_d = d
                best = img
        if best_d / diag > 0.50:
            out[s["sku"]] = None
        else:
            out[s["sku"]] = best
    return out


def save_pixmap_for_xref(doc, xref, dest: pathlib.Path):
    pix = pymupdf.Pixmap(doc, xref)
    if pix.n - pix.alpha > 3:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    pix.save(str(dest))


def main():
    doc = pymupdf.open(PDF)
    page_count = len(doc)

    hero = {}   # sku -> file path (relative)
    thumb = {}  # sku -> file path (relative)

    # to allow multiple SKUs sharing one image (color variants), we count xref usage too
    saved_files = {}  # (page_num, xref) -> path

    for page_num in range(page_count):
        page = doc[page_num]
        page_w, page_h = page.rect.width, page.rect.height
        skus, images = page_extractions(page)
        if not skus:
            continue
        mapping = assign_nearest(skus, images, page_w, page_h)
        is_pricelist = (page_num + 1) >= PRICE_LIST_PAGE_START
        for sku, img in mapping.items():
            if img is None:
                continue
            key = (page_num, img["xref"])
            if key not in saved_files:
                fname = f"p{page_num + 1:02d}_x{img['xref']}.png"
                dest = SKU_DIR / "_raw" / fname
                dest.parent.mkdir(exist_ok=True)
                try:
                    save_pixmap_for_xref(doc, img["xref"], dest)
                except Exception as e:
                    print(f"failed to save xref {img['xref']} on page {page_num + 1}: {e}")
                    continue
                saved_files[key] = dest
            src = saved_files[key]
            # also save a sku-named copy for ergonomic browsing
            suffix = "_thumb" if is_pricelist else "_hero"
            target_dir = SKU_DIR
            sku_named = target_dir / f"{sku}{suffix}.png"
            if not sku_named.exists():
                sku_named.write_bytes(src.read_bytes())
            rel = f"images_by_sku/{sku}{suffix}.png"
            if is_pricelist:
                if sku not in thumb:
                    thumb[sku] = rel
            else:
                if sku not in hero:
                    hero[sku] = rel

    # merge into products.json
    products_path = DATA_DIR / "products.json"
    products = json.loads(products_path.read_text(encoding="utf-8"))
    matched_hero = matched_thumb = matched_either = 0
    for p in products:
        sku = p["sku"]
        h = hero.get(sku)
        t = thumb.get(sku)
        p["hero_image"] = h
        p["thumb_image"] = t
        p["primary_image"] = h or t
        if h:
            matched_hero += 1
        if t:
            matched_thumb += 1
        if h or t:
            matched_either += 1

    products_path.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")

    # unmatched report
    unmatched = [p["sku"] for p in products if not (p.get("hero_image") or p.get("thumb_image"))]
    (DATA_DIR / "mapping_unmatched.json").write_text(
        json.dumps(unmatched, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # visual QA page
    rows = []
    for p in products:
        rows.append(f"""
<tr>
  <td><code>{p['sku']}</code></td>
  <td>{p['brand']}</td>
  <td>{p['name']}</td>
  <td>R$ {p['price_brl']:.2f}</td>
  <td>{f'<img src="../{p["hero_image"]}" style="max-height:120px"/>' if p.get('hero_image') else '<span style="color:#aaa">—</span>'}</td>
  <td>{f'<img src="../{p["thumb_image"]}" style="max-height:80px"/>' if p.get('thumb_image') else '<span style="color:#aaa">—</span>'}</td>
</tr>""")
    html = f"""<!doctype html>
<html><head><meta charset="utf-8"><title>SKU mapping QA</title>
<style>
  body {{ font-family: system-ui, sans-serif; padding: 24px; background:#fafaf7; }}
  h1 {{ margin: 0 0 4px; }}
  .meta {{ color:#666; margin-bottom:24px }}
  table {{ border-collapse: collapse; width: 100%; }}
  th, td {{ padding: 8px 10px; border-bottom: 1px solid #eee; vertical-align: middle; text-align: left; }}
  th {{ background: #f0ece6; position: sticky; top: 0; }}
  code {{ background:#fff; padding:2px 6px; border-radius:3px; border:1px solid #ddd }}
  img {{ display:block; border-radius:4px; }}
</style></head><body>
<h1>SKU → Image mapping QA</h1>
<p class="meta">
  {len(products)} SKUs · hero matched: {matched_hero} · thumb matched: {matched_thumb}
  · either: {matched_either} · unmatched: {len(unmatched)}
</p>
<table>
  <thead><tr><th>SKU</th><th>Brand</th><th>Name</th><th>Price</th><th>Hero (inner page)</th><th>Thumb (price-list)</th></tr></thead>
  <tbody>{''.join(rows)}</tbody>
</table>
</body></html>"""
    (DATA_DIR / "mapping_review.html").write_text(html, encoding="utf-8")

    print(f"products: {len(products)}")
    print(f"  matched hero: {matched_hero}")
    print(f"  matched thumb: {matched_thumb}")
    print(f"  matched either: {matched_either}")
    print(f"  unmatched: {len(unmatched)}")
    print(f"  files: {SKU_DIR}")


if __name__ == "__main__":
    main()
