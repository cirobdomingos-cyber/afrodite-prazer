"""
Extract structured catalog data + product images from the A Sós PDF.
Outputs:
  design-handoff/data/products.json    — all products with SKU, name, price, brand, page
  design-handoff/images/page_NN_img_K.png — every embedded image, grouped by page
"""

import json
import re
import pathlib

import pymupdf

PDF = pathlib.Path(r"c:/repo/afrodite-prazer/Catalogo-A-Sos-Sensual-1-Edicao-Com-Preco-2026.pdf")
ROOT = pathlib.Path(r"c:/repo/afrodite-prazer/design-handoff")
DATA_DIR = ROOT / "data"
IMG_DIR = ROOT / "images"

# ---- product line metadata (from inspecting the catalog) ----
# brand → category sections discovered while reading
BRANDS = {
    "DS": "Dermosex",
    "AS": "A Sós (mixed)",   # AS prefix used for several lines — disambiguated by context
    "BS": "Biosex",
    "LV": "Olove",
    "FE": "Feminist",
    "PA": "Feminist",
    "PC": "Feminist",
    "BA": "Cosméticos & Acessórios",
    "EN": "Cosméticos & Acessórios",
    "KA": "Cosméticos & Acessórios",
    "IA": "Toys (Sweet Vibe / Go Vibe / Sensevibe / Dona / Go Play / By Ingrid)",
}

# manual SKU → sub-brand override for AS-prefix and IA-prefix items
# (built from inspection of the catalog body pages)
SUB_BRAND = {
    # Dermosex Mature
    "DS021": "Dermosex Mature", "DS024": "Dermosex Mature", "DS022": "Dermosex Mature",
    # Natural Sex
    "AS346": "Natural Sex", "AS347": "Natural Sex",
    # The Secret
    "AS350": "The Secret", "AS351": "The Secret", "AS348": "The Secret",
    "AS349": "The Secret", "AS342": "The Secret", "AS345": "The Secret",
    "AS334": "The Secret", "AS220": "The Secret", "AS319": "The Secret",
    # Hombre
    "AS289": "Hombre",
    # Tantra
    "AS279": "Tantra", "AS361": "Tantra", "AS362": "Tantra", "AS363": "Tantra",
    # Lubrisex
    "AS062": "Lubrisex", "AS140": "Lubrisex", "AS343": "Lubrisex",
    "AS288": "Lubrisex", "AS296": "Lubrisex", "AS290": "Lubrisex",
    "AS294": "Lubrisex", "AS295": "Lubrisex",
    # Feminist (AS-prefix subset)
    "AS359": "Feminist", "AS360": "Feminist",
    # Cosméticos & Acessórios (AS misc)
    "AS339": "By Ingrid Guimarães",
    "AS341": "Cosméticos & Acessórios",
    "AS233R": "Cosméticos & Acessórios",
    "AS083": "Cosméticos & Acessórios",
    "AS333": "Cosméticos & Acessórios",
    "AS222": "Cosméticos & Acessórios",
    "AS214": "Cosméticos & Acessórios",
    # IA-prefix toys subgrouping
    "IA431L": "By Ingrid Guimarães", "IA431R": "By Ingrid Guimarães",
    "IA467": "Sweet Vibe", "IA468": "Sweet Vibe",
    "IA453L": "Sweet Vibe", "IA453R": "Sweet Vibe",
    "IA420AM": "Sweet Vibe", "IA420AZ": "Sweet Vibe", "IA420VE": "Sweet Vibe",
    "IA421RO": "Sweet Vibe",
    "IA456": "Sweet Vibe",
    "IA450S": "Sweet Vibe", "IA450V": "Sweet Vibe",
    "IA433": "Go Vibe", "IA451": "Go Vibe",
    "IA406": "Go Vibe", "IA407": "Go Vibe", "IA360": "Go Vibe",
    "IA363": "Go Vibe", "IA362": "Go Vibe",
    "IA452": "Go Vibe", "IA454R": "Go Vibe", "IA454A": "Go Vibe",
    "IA444": "Go Vibe", "IA380": "Go Vibe", "IA432": "Go Vibe",
    "IA415": "Go Vibe", "IA309": "Go Vibe", "IA442": "Go Vibe",
    "IA423": "Go Vibe", "IA457": "Go Vibe", "IA458": "Go Vibe",
    "IA465": "Sensevibe", "IA466": "Sensevibe", "IA445": "Sensevibe",
    "IA464": "Sensevibe", "IA448": "Sensevibe", "IA446": "Sensevibe",
    "IA447": "Sensevibe", "IA321": "Sensevibe", "IA305": "Sensevibe",
    "IA355": "Sensevibe", "IA353": "Sensevibe", "IA400": "Sensevibe",
    "IA357": "Sensevibe", "IA356": "Sensevibe", "IA401": "Sensevibe",
    "IA405": "Sensevibe", "IA390": "Sensevibe", "IA403": "Sensevibe",
    "IA354": "Sensevibe", "IA434C": "Sensevibe", "IA434E": "Sensevibe",
    "IA434S": "Sensevibe",
    "IA413": "Dona", "IA418": "Dona", "IA409": "Dona",
    "IA396": "Dona", "IA384": "Dona",
    "IA438LA": "Go Play", "IA438LI": "Go Play",
    "IA318": "Go Play", "IA436": "Go Play", "IA437": "Go Play",
    "IA414": "Go Play", "IA459": "Go Play", "IA462": "Go Play",
    "IA463": "Go Play", "IA460": "Go Play", "IA461": "Go Play",
    "IA333P": "Go Play", "IA333L": "Go Play", "IA332L": "Go Play",
    "IA332P": "Go Play", "IA367": "Go Play", "IA368": "Go Play",
    "IA392": "Go Play", "IA228": "Cosméticos & Acessórios",
    "IA229": "Cosméticos & Acessórios", "IA230": "Cosméticos & Acessórios",
    "IA324": "Cosméticos & Acessórios", "IA234": "Cosméticos & Acessórios",
    "IA383": "Feminist", "IA352": "Feminist", "IA410": "Feminist",
    "IA411": "Feminist", "IA412": "Feminist", "IA424": "Dermosex Mature (My Series)",
    "IA449": "Dermosex Mature (My Series)",
}


def parse_index_pages(text: str):
    """Parse the master price-list section (pages 78+).
    Each entry is: PRICE / SKU / NAME (multi-line)."""
    pages = text.split("===PAGE BREAK===")
    # index pages start at idx 77 (page 78, zero-indexed text segments)
    index_text = "\n".join(pages[77:])

    # tokenise: walk lines, anchor on R$ price, then SKU on next non-empty line, then name lines until next R$ or page-marker
    raw = [ln.strip() for ln in index_text.splitlines()]
    products = []
    i = 0
    current_page_ref = None
    while i < len(raw):
        line = raw[i]
        if not line:
            i += 1
            continue

        # capture page references like "PÁG. 3" / "PÁG.62"
        m_pg = re.match(r"P[ÁA]G\.\s*(\d+)", line, re.IGNORECASE)
        if m_pg:
            current_page_ref = int(m_pg.group(1))
            i += 1
            continue
        # bare page numbers between sections
        if re.fullmatch(r"\d{1,3}", line) and len(line) <= 3 and 1 <= int(line) <= 99:
            i += 1
            continue

        m_price = re.match(r"R\$\s*([\d.,]+)", line)
        if m_price:
            price = float(m_price.group(1).replace(".", "").replace(",", "."))
            # collect SKUs and name lines until next price / page marker
            j = i + 1
            skus = []
            name_parts = []
            while j < len(raw):
                nxt = raw[j].strip()
                if not nxt:
                    j += 1
                    continue
                if re.match(r"R\$\s*[\d.,]+", nxt):
                    break
                if re.match(r"P[ÁA]G\.", nxt, re.IGNORECASE):
                    break
                # SKU pattern: 2-3 letters + digits (+ optional letters)
                if re.fullmatch(r"[A-Z]{2,3}\d{2,4}[A-Z]{0,3}", nxt):
                    skus.append(nxt)
                else:
                    name_parts.append(nxt)
                j += 1
            name = " ".join(name_parts).strip()
            for sku in skus or [""]:
                if sku:
                    products.append({
                        "sku": sku,
                        "name": name,
                        "price_brl": price,
                        "catalog_page": current_page_ref,
                    })
            i = j
        else:
            i += 1
    return products


def extract_images():
    doc = pymupdf.open(PDF)
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        for img_index, img in enumerate(page.get_images(full=True), start=1):
            xref = img[0]
            try:
                pix = pymupdf.Pixmap(doc, xref)
                if pix.n - pix.alpha > 3:
                    pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
                w, h = pix.width, pix.height
                # skip tiny icons / decorative bits
                if w < 80 or h < 80:
                    pix = None
                    continue
                fname = f"page_{page_num + 1:02d}_img_{img_index:02d}.png"
                out = IMG_DIR / fname
                pix.save(str(out))
                manifest.append({
                    "page": page_num + 1,
                    "file": f"images/{fname}",
                    "w": w, "h": h,
                })
                pix = None
            except Exception as e:
                print(f"skip page {page_num + 1} img {img_index}: {e}")
    return manifest


def main():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(PDF)
    full_text = "\n\n===PAGE BREAK===\n\n".join(p.get_text() for p in doc)

    products = parse_index_pages(full_text)

    # enrich with brand
    for p in products:
        sku = p["sku"]
        if sku in SUB_BRAND:
            p["brand"] = SUB_BRAND[sku]
        else:
            prefix = re.match(r"^[A-Z]+", sku).group(0)
            p["brand"] = BRANDS.get(prefix, "Unknown")

    # dedupe (some SKUs appear with multiple variants; keep first)
    seen = set()
    deduped = []
    for p in products:
        if p["sku"] in seen:
            continue
        seen.add(p["sku"])
        deduped.append(p)

    # write JSON
    out = DATA_DIR / "products.json"
    out.write_text(json.dumps(deduped, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {len(deduped)} products to {out}")

    # write CSV for spreadsheet review
    csv_lines = ["sku,brand,name,price_brl,catalog_page"]
    for p in deduped:
        name = p["name"].replace('"', "'")
        csv_lines.append(f'{p["sku"]},{p["brand"]},"{name}",{p["price_brl"]},{p["catalog_page"]}')
    (DATA_DIR / "products.csv").write_text("\n".join(csv_lines), encoding="utf-8")

    # extract images
    manifest = extract_images()
    (DATA_DIR / "images_manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"wrote {len(manifest)} images to {IMG_DIR}")

    # brand summary
    from collections import Counter
    by_brand = Counter(p["brand"] for p in deduped)
    print("\nproducts by brand:")
    for b, n in by_brand.most_common():
        print(f"  {n:3d}  {b}")


if __name__ == "__main__":
    main()
