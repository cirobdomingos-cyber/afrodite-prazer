"""
Build a single self-contained mapping_review_portable.html with every product image
inlined as base64 data: URI. Resizes images to 280px max-edge to keep file size sane.
Output works from any computer — just double-click the HTML.
"""

import base64
import io
import json
import pathlib

from PIL import Image

ROOT = pathlib.Path(r"c:/repo/afrodite-prazer/catalog-source")
DATA = ROOT / "data" / "products.json"
OUT = ROOT / "mapping_review_portable.html"
MAX_EDGE = 280


def img_to_data_uri(path: pathlib.Path) -> str:
    with Image.open(path) as im:
        im = im.convert("RGB")
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, format="JPEG", quality=82, optimize=True)
        b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    return f"data:image/jpeg;base64,{b64}"


def main():
    products = json.loads(DATA.read_text(encoding="utf-8"))

    rows = []
    embedded = missing = 0
    for p in products:
        rel = p.get("primary_image")
        if not rel:
            img_html = '<span style="color:#aaa">no image</span>'
            missing += 1
        else:
            full = ROOT / rel
            if not full.exists():
                img_html = f'<span style="color:#c00">missing: {rel}</span>'
                missing += 1
            else:
                try:
                    img_html = f'<img src="{img_to_data_uri(full)}" style="max-height:140px;display:block;border-radius:4px"/>'
                    embedded += 1
                except Exception as e:
                    img_html = f'<span style="color:#c00">error: {e}</span>'
                    missing += 1
        rows.append(f"""
<tr>
  <td>{img_html}</td>
  <td><code>{p['sku']}</code></td>
  <td>{p['brand']}</td>
  <td>{p['name']}</td>
  <td style="text-align:right;white-space:nowrap">R$ {p['price_brl']:.2f}</td>
</tr>""")

    html = f"""<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8">
<title>Afrodite Prazer — SKU mapping QA (portable)</title>
<style>
  :root {{ color-scheme: light; }}
  body {{ font-family: -apple-system, system-ui, sans-serif; padding: 24px; background:#fafaf7; color:#2a2421; max-width: 1200px; margin: 0 auto; }}
  h1 {{ margin: 0 0 4px; font-weight: 600 }}
  .meta {{ color:#777; margin-bottom:24px; font-size: 14px }}
  .filter {{ margin-bottom:16px; display:flex; gap:8px; align-items:center }}
  .filter input {{ padding:8px 10px; border:1px solid #ccc; border-radius:4px; flex:1; font-size:14px; background:#fff }}
  table {{ border-collapse: collapse; width: 100%; background:#fff; box-shadow: 0 1px 3px rgba(0,0,0,.04) }}
  th, td {{ padding: 10px 12px; border-bottom: 1px solid #f0ece6; vertical-align: middle; text-align: left; }}
  th {{ background: #f0ece6; position: sticky; top: 0; font-weight:600; font-size:13px; letter-spacing: .02em; text-transform: uppercase; color:#5a4f4a }}
  code {{ background:#f7f3ed; padding:2px 6px; border-radius:3px; border:1px solid #e6dccd; font-size:12px; color:#7a3a1a }}
  tr:hover {{ background: #fbf8f2 }}
</style>
</head><body>
<h1>SKU → Image mapping QA</h1>
<p class="meta">
  {len(products)} products · embedded: {embedded} · missing/error: {missing}
  · self-contained file (works on any computer)
</p>
<div class="filter">
  <input id="q" type="search" placeholder="Filter by SKU, brand, or name…" autofocus>
</div>
<table>
  <thead><tr><th>Image</th><th>SKU</th><th>Brand</th><th>Name</th><th>Price</th></tr></thead>
  <tbody id="tb">{''.join(rows)}</tbody>
</table>
<script>
  const q = document.getElementById('q');
  const rows = Array.from(document.querySelectorAll('#tb tr'));
  q.addEventListener('input', () => {{
    const term = q.value.toLowerCase();
    rows.forEach(r => {{
      r.style.display = r.textContent.toLowerCase().includes(term) ? '' : 'none';
    }});
  }});
</script>
</body></html>"""

    OUT.write_text(html, encoding="utf-8")
    size_mb = OUT.stat().st_size / 1024 / 1024
    print(f"wrote {OUT} ({size_mb:.1f} MB) — {embedded} images embedded, {missing} missing")


if __name__ == "__main__":
    main()
