import json
import requests
from bs4 import BeautifulSoup
import os
import sys
from pathlib import Path
from urllib.parse import urlparse
import time

# Load product list
with open('product_list.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Create output directory
output_dir = Path('data/product-images')
output_dir.mkdir(parents=True, exist_ok=True)

results = {
    'success': [],
    'failed': [],
    'no_images': []
}

session = requests.Session()
session.headers.update({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
})

print(f"Processing {len(products)} products...\n")

for i, product in enumerate(products, 1):
    sku = product['sku']
    link = product['link']
    
    sys.stdout.write(f"\r[{i}/{len(products)}] {sku:12} ", )
    sys.stdout.flush()
    
    try:
        # Follow shortlink
        response = session.head(link, allow_redirects=True, timeout=10)
        final_url = response.url
        
        # Get product page
        response = session.get(final_url, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract image URLs - look for common patterns
        img_urls = set()
        
        # Pattern 1: img tags with src or data-src
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            if src and ('http' in src or '/' in src):
                img_urls.add(src)
        
        # Pattern 2: picture sources
        for picture in soup.find_all('picture'):
            for source in picture.find_all('source'):
                srcset = source.get('srcset')
                if srcset:
                    # Extract first URL from srcset
                    first_url = srcset.split()[0]
                    if first_url:
                        img_urls.add(first_url)
        
        # Filter for likely product images (remove tiny icons, favicons)
        product_images = []
        for img_url in img_urls:
            # Make absolute URL
            if img_url.startswith('//'):
                img_url = 'https:' + img_url
            elif img_url.startswith('/'):
                from urllib.parse import urljoin
                img_url = urljoin(final_url, img_url)
            
            # Skip obvious non-product images
            if any(x in img_url.lower() for x in ['favicon', 'logo', 'icon', '1x1', 'pixel', 'banner']):
                continue
            
            product_images.append(img_url)
        
        if not product_images:
            results['no_images'].append({'sku': sku, 'url': final_url})
            print(f"✗ no images")
            continue
        
        # Download first image (or a few)
        sku_dir = output_dir / sku
        sku_dir.mkdir(exist_ok=True)
        
        downloaded = 0
        for img_idx, img_url in enumerate(product_images[:3]):  # Limit to 3 images per product
            try:
                img_response = session.get(img_url, timeout=10)
                img_response.raise_for_status()
                
                # Determine extension
                content_type = img_response.headers.get('content-type', 'image/jpeg')
                ext = '.jpg' if 'jpeg' in content_type else '.png' if 'png' in content_type else '.webp' if 'webp' in content_type else '.jpg'
                
                filename = sku_dir / f"{sku}_{img_idx}{ext}"
                with open(filename, 'wb') as f:
                    f.write(img_response.content)
                
                downloaded += 1
                time.sleep(0.1)  # Be nice to server
            except:
                pass
        
        if downloaded > 0:
            results['success'].append({'sku': sku, 'images': downloaded})
            print(f"✓ {downloaded} image(s)")
        else:
            results['no_images'].append({'sku': sku, 'url': final_url})
            print(f"✗ failed to download")
        
        time.sleep(0.2)
        
    except Exception as e:
        results['failed'].append({'sku': sku, 'error': str(e)})
        print(f"✗ {str(e)[:30]}")

print(f"\n\n=== SUMMARY ===")
print(f"✓ Success: {len(results['success'])} products")
print(f"✗ Failed: {len(results['failed'])} products")
print(f"⚠ No images found: {len(results['no_images'])} products")

if results['failed']:
    print(f"\nFailed products:")
    for item in results['failed']:
        print(f"  {item['sku']}: {item['error']}")

if results['no_images']:
    print(f"\nNo images found:")
    for item in results['no_images']:
        print(f"  {item['sku']}")

# Save results
with open('scrape_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"\nResults saved to scrape_results.json")
