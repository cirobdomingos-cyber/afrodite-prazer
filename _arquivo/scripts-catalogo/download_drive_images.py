#!/usr/bin/env python3
"""
Download images from authenticated Google Drive folder structure.
Requires valid browser cookies stored in COOKIES dict.
"""

import urllib.request
import urllib.error
import os
from pathlib import Path

COOKIES = {
    'SID': 'g.a000-wie3HpHfDgsaR7Rqmw1sf_d6AaDwTHA0vHk6vHMv9Vb6ll10qQlX7wB29YwuDkeEAd_CgACgYKAXESARASFQHGX2Mi25lekvBKwj-0iyu1Gvy5FRoVAUF8yKrYqXtJ0JpZhfuY5J4_ks790076',
    'APISID': '-OqGpsQ0Mcn7e4Fj/ADV1cuEMRCXTlmBKL',
    'SAPISID': 'sICA8Ms5qf0byMpT/A2LCHfHNT5HRPH6z4',
    '__Secure-1PAPISID': 'sICA8Ms5qf0byMpT/A2LCHfHNT5HRPH6z4',
    '__Secure-3PAPISID': 'sICA8Ms5qf0byMpT/A2LCHfHNT5HRPH6z4',
    'SIDCC': 'AKEyXzWpeY47BVyiYTqtPeizWN7nd0evo1jv5qRc2dRB4H2RFlIyBq-u7FwrY5GhCa-Ccay3Yg',
}

DRIVE_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id={file_id}'

def download_image(file_id: str, filename: str, output_dir: str) -> bool:
    """Download a single image from Google Drive."""
    output_path = Path(output_dir) / filename
    
    # Skip if already exists
    if output_path.exists():
        print(f"✓ {filename} (already exists)")
        return True
    
    url = DRIVE_DOWNLOAD_URL.format(file_id=file_id)
    cookie_header = '; '.join(f'{k}={v}' for k, v in COOKIES.items())
    
    try:
        req = urllib.request.Request(
            url,
            headers={
                'Cookie': cookie_header,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        )
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            output_path.write_bytes(data)
            print(f"✓ {filename} ({len(data)} bytes)")
            return True
    except Exception as e:
        print(f"✗ {filename}: {e}")
        return False

def batch_download(image_list: list, base_output_dir: str) -> dict:
    """
    Download a batch of images.
    image_list: [(file_id, filename, folder_code), ...]
    """
    results = {'success': 0, 'failed': 0}
    for file_id, filename, folder in image_list:
        output_dir = os.path.join(base_output_dir, folder)
        os.makedirs(output_dir, exist_ok=True)
        if download_image(file_id, filename, output_dir):
            results['success'] += 1
        else:
            results['failed'] += 1
    return results

if __name__ == '__main__':
    # Example: Download 10 images from DS001
    images_to_download = [
        ('1cPs_Fs1p7CX-lFD4GmSehxwD1tFwiEVH', 'Creme Hidratante - DS001.jpg', 'DS001'),
        ('1BH0rBkyMIFH51x2F3HqSexu45CTtxg3i', 'Creme Hidratante - DS001(1).jpg', 'DS001'),
        ('1LTzeIuzbFqYcFyHdQj3chOwevBK-ft5u', 'Dermosex_IMG_9240.jpg', 'DS001'),
        ('16z3DksSmkdjdt1ikV3FixXr4qioS6fJc', 'Dermosex_IMG_9245.jpg', 'DS001'),
        ('1xmRZs_B9nw6yJyd0rV5W_K1U_jXaDGi-', 'Dermosex_IMG_9246.jpg', 'DS001'),
        ('1ntxrm2fdSEKe9rrUXNCO2dGXjRiRqUMM', 'Dermosex_IMG_9252.jpg', 'DS001'),
        ('1hp3qUsz3ZeYQGKQszWFQzW853zNPtIkY', 'Dermosex_IMG_9254.jpg', 'DS001'),
        ('1FatvYDCiQ0yog0mWKU0m6e_S8b9wmjlt', 'Dermosex_IMG_9260.jpg', 'DS001'),
        ('1wdyCaIq-maIHr-zG1nwUOW2H2zSa7vD0', 'Dermosex_IMG_9261.jpg', 'DS001'),
        ('1W1h4n91Gyjz8AC3bxh4h2A-j8q2G02rv', 'Dermosex_IMG_9262.jpg', 'DS001'),
    ]
    
    output_base = 'data/drive-images'
    results = batch_download(images_to_download, output_base)
    print(f"\n✓ Success: {results['success']} | ✗ Failed: {results['failed']}")
