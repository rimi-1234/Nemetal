"""
Download all Easycon product images locally and rewrite products.js
so images always show (no hotlink / file:// issues).
"""
import re
import os
import sys
import time
import hashlib
import requests

sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.abspath(__file__))
JS_PATH = os.path.join(ROOT, "data", "products.js")
OUT_DIR = os.path.join(ROOT, "assets", "images", "products")
os.makedirs(OUT_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Referer": "https://www.easycon.com.bd/",
    "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
}

with open(JS_PATH, encoding="utf-8") as f:
    content = f.read()

urls = list(dict.fromkeys(re.findall(
    r'https://(?:www\.)?easycon\.com\.bd/public/uploads/all/[A-Za-z0-9_\-\.]+\.(?:jpg|jpeg|png|webp)',
    content,
)))

print(f"Found {len(urls)} unique Easycon image URLs")
print(f"Saving to: {OUT_DIR}\n")

url_to_local = {}
ok = fail = skip = 0

for i, url in enumerate(urls, 1):
    fname = url.rstrip("/").split("/")[-1]
    # normalize host in local map
    local_rel = f"assets/images/products/{fname}"
    local_abs = os.path.join(OUT_DIR, fname)

    if os.path.exists(local_abs) and os.path.getsize(local_abs) > 500:
        url_to_local[url] = local_rel
        # also map www / non-www variants
        alt = url.replace("https://www.easycon.com.bd", "https://easycon.com.bd")
        url_to_local[alt] = local_rel
        alt2 = url.replace("https://easycon.com.bd", "https://www.easycon.com.bd")
        url_to_local[alt2] = local_rel
        skip += 1
        print(f"  [{i:3d}/{len(urls)}] SKIP (exists) {fname[:50]}")
        continue

    try:
        r = requests.get(url, headers=HEADERS, timeout=20)
        if r.status_code == 200 and len(r.content) > 500 and "image" in r.headers.get("content-type", ""):
            with open(local_abs, "wb") as out:
                out.write(r.content)
            url_to_local[url] = local_rel
            alt = url.replace("https://www.easycon.com.bd", "https://easycon.com.bd")
            url_to_local[alt] = local_rel
            alt2 = url.replace("https://easycon.com.bd", "https://www.easycon.com.bd")
            url_to_local[alt2] = local_rel
            ok += 1
            print(f"  [{i:3d}/{len(urls)}] OK   {fname[:50]} ({len(r.content)//1024} KB)")
        else:
            fail += 1
            print(f"  [{i:3d}/{len(urls)}] FAIL {fname[:50]} status={r.status_code} len={len(r.content)}")
    except Exception as e:
        fail += 1
        print(f"  [{i:3d}/{len(urls)}] ERR  {fname[:40]} | {e}")
    time.sleep(0.15)

# Rewrite products.js — replace remote URLs with local paths
new_content = content
replaced = 0
# Sort by length desc so longer URLs replace first
for remote, local in sorted(url_to_local.items(), key=lambda x: -len(x[0])):
    if remote in new_content:
        count = new_content.count(remote)
        new_content = new_content.replace(remote, local)
        replaced += count

# Update header comment
new_content = new_content.replace(
    "Images: Real public URLs from easycon.com.bd/public/uploads/all/",
    "Images: Local copies in assets/images/products/ (downloaded from easycon.com.bd)",
)

with open(JS_PATH, "w", encoding="utf-8") as f:
    f.write(new_content)

# Verify remaining remote easycon product urls
left = len(re.findall(r'easycon\.com\.bd/public/uploads', new_content))
print(f"\nDownloaded: {ok}  Skipped: {skip}  Failed: {fail}")
print(f"Replaced {replaced} URL references in products.js")
print(f"Remaining remote easycon URLs: {left}")
print("Done. Hard-refresh the browser (Ctrl+F5).")
