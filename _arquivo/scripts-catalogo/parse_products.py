import csv
import json

csv_path = r"C:\Users\cirob\Downloads\Produtos Junho_asos(Planilha2).csv"

# Read CSV with encoding detection
products = []
try:
    with open(csv_path, 'r', encoding='latin-1') as f:
        reader = csv.DictReader(f, delimiter=';')
        for row in reader:
            sku = row.get('SKU', '').strip()
            link = row.get('Link', '').strip()
            if sku and link:
                products.append({'sku': sku, 'link': link})
except UnicodeDecodeError:
    with open(csv_path, 'r', encoding='cp1252') as f:
        reader = csv.DictReader(f, delimiter=';')
        for row in reader:
            sku = row.get('SKU', '').strip()
            link = row.get('Link', '').strip()
            if sku and link:
                products.append({'sku': sku, 'link': link})

# Group by brand/prefix
by_prefix = {}
for p in products:
    prefix = ''.join([c for c in p['sku'] if c.isalpha()])
    if prefix not in by_prefix:
        by_prefix[prefix] = []
    by_prefix[prefix].append(p['sku'])

print(f"Total products: {len(products)}")
print(f"\nBy prefix:")
for prefix in sorted(by_prefix.keys()):
    codes = sorted(by_prefix[prefix])
    print(f"  {prefix}: {len(codes)} → {', '.join(codes)}")

# Save for scraper
with open('product_list.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)
print(f"\nSaved to product_list.json")
