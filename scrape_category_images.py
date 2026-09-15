"""
Nematel — Category-wise Easycon image scraper
==============================================
Crawls https://www.easycon.com.bd/category/... pages,
extracts real product image URLs, and patches data/products.js.

Usage:
  python scrape_category_images.py
"""
import requests
from bs4 import BeautifulSoup
import re
import json
import time
import sys
import os
from urllib.parse import unquote

sys.stdout.reconfigure(encoding="utf-8")

BASE = "https://www.easycon.com.bd"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

# Real Easycon category URLs (from their site)
CATEGORY_URLS = {
    "construction-chemical": f"{BASE}/category/construction%20chemicals",
    "cement-aggregate":      f"{BASE}/category/cement%20&%20aggregate",
    "tmt-steel-bar":         f"{BASE}/category/door--door-fitting-qex0e",  # steel often under fittings cluster; also try below
    "bricks-blocks":         f"{BASE}/category/bricks%20&%20blocks",
    "doors":                 f"{BASE}/category/door%20&%20fittings",
    "door-fittings":         f"{BASE}/category/door%20&%20fittings",
    "electric-materials":    f"{BASE}/category/electric%20materials",
    "pipe-fitting":          f"{BASE}/category/pipe%20&%20fitting",
    "sanitary-ware":         f"{BASE}/category/sanitary-ware-nmjxa",
    "tiles-flooring":        f"{BASE}/category/ubc-parking-tiles-dpgdi",
}

# Extra category pages to scrape for more coverage
EXTRA_URLS = [
    f"{BASE}/category/cement%20&%20aggregate",
    f"{BASE}/category/construction%20chemicals",
    f"{BASE}/category/bricks%20&%20blocks",
    f"{BASE}/category/ceramic-bricks-8mpty",
    f"{BASE}/category/concrete-block--brick-j863f",
    f"{BASE}/category/door%20&%20fittings",
    f"{BASE}/category/electric%20materials",
    f"{BASE}/category/pipe%20&%20fitting",
    f"{BASE}/category/sanitary-ware-nmjxa",
    f"{BASE}/category/constructionservice",
    f"{BASE}/category/glass-door-twhjm",
    f"{BASE}/category/eco-ceramics-m1u0s",
    f"{BASE}/category/Mirpur-Ceramics-ikxJo",
    f"{BASE}/category/ubc-parking-tiles-dpgdi",
]

SHARED_HASHES = {
    "erGsw4H8c0n36mCstJsQuECpXk6nlDneAxuFlf44",
    "fNvVvrSDc0mW0S3On9k9SPWc5SKJ8mWQN18452YI",
    "hZymor2EA1SP6JCvEM2uoM2qAep0QvyEi4ZRFJuy",
    "KXBjdOtLBD51dU2qRuew6pEO02uNA7ClTIA885MY",
    "TbyWz5pCEAuj2wF08QKqO8b9ogzXDRPtTg1URzQr",
    "K6WRiazMLvI98AWPTTRFtUmTVU3tmUKdFRtwWpVQ",
    "WUgA8rSafk0QGCCBP8uZvamVb4N17WqU9ss7xLzo",
    "teCIgdwVbVF6KKgpt0QYZTzcsdpx0QgvqYMkf3wJ",
    "D7VOhge49IUlKNuWkTKg5CZBqYdTqPmhDYOwHZD9",
    "HegHUZ9fTH9oETXCYs2Egmx1UbmrclSWcrsOp4VP",
    "dzbAIVgYGk0dBTJk9TxMxAqpgz0k3HkM20ButHtx",
    "QVJQBg9GyoUwP0C5aSjHxIu010UDdFpQMyRq2bCx",
    "AJujbSLX9yF3cmPmj7SeAsTSjpKnYW6ZD2MToksD",
}

# Map our product slug -> keywords to match Easycon product titles/slugs
PRODUCT_MATCH = {
    "dr-fixit-pidiproof-lw-plus": ["aquaguard", "abcaquaguard", "plastocrete"],
    "sika-cim-pink-20kg": ["sika cim pink", "sika-cim-pink"],
    "sika-cim": ["sikacim", "sika-cim-3", "sika cim"],
    "dr-fixit-pidifin-2k-15kg": ["aquaguard", "plastocrete", "sika"],
    "sika-tilofix-30kg": ["sika", "tilofix", "plastocrete"],
    "sikagrout-214-bd": ["sika", "grout", "plastocrete"],
    "epoxy-flooring": ["epoxy"],
    "skim-coating": ["skim"],
    "fresh-ultra-strong-cement": ["fresh"],
    "insee-cement": ["insee"],
    "bashundhara-cement": ["bashundhara"],
    "holcim-cement": ["holcim cement"],
    "seven-rings-cement-gold": ["seven rings"],
    "holcim-water-protect-cement": ["water protect", "holcim water"],
    "bsrm-steel": ["bsrm"],
    "csrm-steel": ["csrm"],
    "gph-ispat-steel": ["gph"],
    "anwar-ispat-steel": ["anwar", "anowar"],
    "eco-ceramics-ceramic-brick": ["ceramic brick", "eco ceramics"],
    "ecocil-ceramic-brick": ["ecocil"],
    "easycon-block-aac": ["aac", "easycon-block"],
    "next-aac-block": ["next-aac", "aac block"],
    "solid-concrete-bricks": ["concrete solid", "concrete-bricks"],
    "ubc-parking-tiles": ["parking tile"],
    "roof-tile-brick": ["roof tile"],
    "mostafa-pvc-door": ["easycon door", "pvc door"],
    "mostafa-upvc-door": ["easycon door", "upvc"],
    "pd-glass-door": ["glass door", "pd-glass"],
    "wpc-green-eco-door": ["crystal glass", "ams glass", "glass door"],
    "digital-door-lock": ["door lock", "digital"],
    "ag-2inch-gi-plug": ["gi plag", "gi plug", "ag-2"],
    "5inch-door-clam": ["door clam"],
    "brb-cable-1x4-rm": ["1x4", "brb cable"],
    "brb-green-cable-1x1-5": ["green cable", "1x1.5", "1x15"],
    "brb-cable-1x3-rm": ["1x3", "bya 1 core"],
    "brb-red-cable-1x7-rm": ["red cable", "1x7"],
    "brb-4inch-pipe-27mm": ["4", "pipe", "2.70"],
    "brb-4inch-pipe-110mm": ["110mm", "2.00"],
    "brb-6inch-pipe-3mm": ["6", "pipe", "3.00"],
    "brb-ts-pipe-3-4inch": ["ts", "3/4", "3.70"],
    "brb-ts-pipe-1-2inch": ["1/2", "ts pipe"],
    "m-seal-solvent-cement": ["m seal", "solvent"],
    "walton-wall-hung-commode": ["sanitary", "gazi"],
    "rfl-wash-basin-pedestal": ["sanitary", "gazi"],
    "rfl-basin-mixer-tap": ["sanitary", "gazi"],
    "walton-rain-shower": ["sanitary", "gazi"],
    "berger-luxury-silk-4l": ["paint"],  # may not exist — use category pool
    "asia-paint-exterior-4l": ["paint"],
    "berger-weather-coat-4l": ["paint"],
    "asia-paint-wood-primer-1l": ["paint"],
    "mirpur-ceramics-floor-60x60": ["mirpur"],
    "eco-ceramics-wall-30x60": ["eco ceramic"],
    "mirpur-ceramics-10hole-facing": ["10-hole", "facing", "mirpur"],
    "roof-tile-large": ["roof tile"],
    "construction-safety-helmet": ["helmet", "safety"],
    "safety-work-gloves": ["glove", "safety"],
    "safety-boots-steel-toe": ["boot", "safety"],
    "safety-vest-class2": ["vest", "safety"],
}

# Category → fallback image pool from scraped products in that category
CATEGORY_FOR_PRODUCT = {
    "dr-fixit-pidiproof-lw-plus": "construction-chemical",
    "sika-cim-pink-20kg": "construction-chemical",
    "sika-cim": "construction-chemical",
    "dr-fixit-pidifin-2k-15kg": "construction-chemical",
    "sika-tilofix-30kg": "construction-chemical",
    "sikagrout-214-bd": "construction-chemical",
    "epoxy-flooring": "construction-chemical",
    "skim-coating": "construction-chemical",
    "fresh-ultra-strong-cement": "cement-aggregate",
    "insee-cement": "cement-aggregate",
    "bashundhara-cement": "cement-aggregate",
    "holcim-cement": "cement-aggregate",
    "seven-rings-cement-gold": "cement-aggregate",
    "holcim-water-protect-cement": "cement-aggregate",
    "bsrm-steel": "tmt-steel-bar",
    "csrm-steel": "tmt-steel-bar",
    "gph-ispat-steel": "tmt-steel-bar",
    "anwar-ispat-steel": "tmt-steel-bar",
    "eco-ceramics-ceramic-brick": "bricks-blocks",
    "ecocil-ceramic-brick": "bricks-blocks",
    "easycon-block-aac": "bricks-blocks",
    "next-aac-block": "bricks-blocks",
    "solid-concrete-bricks": "bricks-blocks",
    "ubc-parking-tiles": "bricks-blocks",
    "roof-tile-brick": "bricks-blocks",
    "mostafa-pvc-door": "doors",
    "mostafa-upvc-door": "doors",
    "pd-glass-door": "doors",
    "wpc-green-eco-door": "doors",
    "digital-door-lock": "door-fittings",
    "ag-2inch-gi-plug": "door-fittings",
    "5inch-door-clam": "door-fittings",
    "brb-cable-1x4-rm": "electric-materials",
    "brb-green-cable-1x1-5": "electric-materials",
    "brb-cable-1x3-rm": "electric-materials",
    "brb-red-cable-1x7-rm": "electric-materials",
    "brb-4inch-pipe-27mm": "pipe-fitting",
    "brb-4inch-pipe-110mm": "pipe-fitting",
    "brb-6inch-pipe-3mm": "pipe-fitting",
    "brb-ts-pipe-3-4inch": "pipe-fitting",
    "brb-ts-pipe-1-2inch": "pipe-fitting",
    "m-seal-solvent-cement": "pipe-fitting",
    "walton-wall-hung-commode": "sanitary-ware",
    "rfl-wash-basin-pedestal": "sanitary-ware",
    "rfl-basin-mixer-tap": "sanitary-ware",
    "walton-rain-shower": "sanitary-ware",
    "berger-luxury-silk-4l": "paint-coating",
    "asia-paint-exterior-4l": "paint-coating",
    "berger-weather-coat-4l": "paint-coating",
    "asia-paint-wood-primer-1l": "paint-coating",
    "mirpur-ceramics-floor-60x60": "tiles-flooring",
    "eco-ceramics-wall-30x60": "tiles-flooring",
    "mirpur-ceramics-10hole-facing": "tiles-flooring",
    "roof-tile-large": "tiles-flooring",
    "construction-safety-helmet": "safety-equipment",
    "safety-work-gloves": "safety-equipment",
    "safety-boots-steel-toe": "safety-equipment",
    "safety-vest-class2": "safety-equipment",
}


def is_product_img(url):
    if not url or "placeholder" in url:
        return False
    stem = url.split("/")[-1].rsplit(".", 1)[0]
    return stem not in SHARED_HASHES and "uploads/all" in url


def fetch(url, timeout=15):
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout)
        return r if r.status_code == 200 else None
    except Exception as e:
        print(f"  fetch error: {e}")
        return None


def extract_products_from_category(url, our_cat_slug):
    """Parse category listing: product name, slug, image from cards."""
    r = fetch(url)
    if not r:
        return []

    soup = BeautifulSoup(r.text, "lxml")
    products = []
    seen = set()

    # Product cards: look for links to /product/
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if "/product/" not in href:
            continue
        full = href if href.startswith("http") else BASE + href
        slug = full.rstrip("/").split("/")[-1]
        if slug in seen or len(slug) < 3:
            continue

        # Find image near this link
        img = a.find("img")
        if not img:
            parent = a.find_parent(["div", "li", "article"])
            img = parent.find("img") if parent else None

        img_url = ""
        if img:
            for attr in ("data-src", "src", "data-lazy", "data-original"):
                val = img.get(attr, "") or ""
                if is_product_img(val):
                    img_url = val
                    break

        title = (img.get("alt", "") if img else "") or a.get_text(" ", strip=True)
        title = re.sub(r"\s+", " ", title).strip()[:120]

        if not img_url:
            # try og later from product page
            continue

        seen.add(slug)
        products.append({
            "slug": slug,
            "title": title.lower(),
            "image": img_url,
            "url": full,
            "category": our_cat_slug,
        })

    # Also pull all upload images + og from linked product pages if listing had few
    return products


def enrich_with_product_page(item):
    """Get og:image from product detail page."""
    r = fetch(item["url"])
    if not r:
        return item
    soup = BeautifulSoup(r.text, "lxml")
    og = soup.find("meta", property="og:image")
    og_img = og.get("content", "").strip() if og else ""
    if is_product_img(og_img):
        item["image"] = og_img
        item["images"] = [og_img]
    else:
        item["images"] = [item["image"]] if item.get("image") else []

    # Extra gallery images
    raw = re.findall(
        r'https?://(?:www\.)?easycon\.com\.bd/public/uploads/all/'
        r'[A-Za-z0-9_\-\.]+\.(?:jpg|jpeg|png|webp)',
        r.text,
    )
    for u in raw:
        if is_product_img(u) and u not in item["images"]:
            item["images"].append(u)
        if len(item["images"]) >= 4:
            break
    return item


def score_match(our_slug, keywords, easycon_item):
    blob = (easycon_item.get("title", "") + " " + easycon_item.get("slug", "")).lower()
    score = 0
    for kw in keywords:
        if kw.lower() in blob:
            score += 2
    # slug token overlap
    our_tokens = set(re.split(r"[-_]", our_slug))
    their_tokens = set(re.split(r"[-_]", easycon_item.get("slug", "")))
    score += len(our_tokens & their_tokens)
    return score


def main():
    print("=" * 60)
    print("Category-wise Easycon image scraper")
    print("=" * 60)

    all_items = []
    cat_pools = {k: [] for k in set(CATEGORY_FOR_PRODUCT.values())}

    # 1) Crawl category listing pages
    urls_done = set()
    for our_cat, url in list(CATEGORY_URLS.items()) + [(None, u) for u in EXTRA_URLS]:
        if url in urls_done:
            continue
        urls_done.add(url)
        label = unquote(url.split("/category/")[-1])[:40]
        print(f"\nCategory: {label}")
        items = extract_products_from_category(url, our_cat or "unknown")
        print(f"  Found {len(items)} products with images on listing")

        # Enrich first N with detail pages for better og:image
        for i, item in enumerate(items[:25]):
            item = enrich_with_product_page(item)
            items[i] = item
            time.sleep(0.25)
            print(f"    [{i+1}] {item['slug'][:45]:<45} | {(item.get('images') or [''])[0][-40:]}")

        all_items.extend(items)
        time.sleep(0.3)

    # Build category pools from all scraped images
    for item in all_items:
        imgs = item.get("images") or ([item["image"]] if item.get("image") else [])
        cat = item.get("category") or "unknown"
        if cat in cat_pools:
            for im in imgs:
                if im not in cat_pools[cat]:
                    cat_pools[cat].append(im)

    # Also dump cement pool explicitly from cement category items
    cement_items = [i for i in all_items if "cement" in i.get("slug", "") or "cement" in i.get("title", "")]
    for i in cement_items:
        for im in (i.get("images") or []):
            if im not in cat_pools["cement-aggregate"]:
                cat_pools["cement-aggregate"].append(im)

    chem_items = [i for i in all_items if any(x in i.get("slug","")+i.get("title","") for x in ("sika", "epoxy", "skim", "aqua", "plasto"))]
    for i in chem_items:
        for im in (i.get("images") or []):
            if im not in cat_pools["construction-chemical"]:
                cat_pools["construction-chemical"].append(im)

    steel_items = [i for i in all_items if any(x in i.get("slug","")+i.get("title","") for x in ("bsrm", "csrm", "gph", "ispat", "steel", "ksrm"))]
    for i in steel_items:
        for im in (i.get("images") or []):
            if im not in cat_pools.setdefault("tmt-steel-bar", []):
                cat_pools["tmt-steel-bar"].append(im)

    door_items = [i for i in all_items if "door" in i.get("slug","")+i.get("title","")]
    for i in door_items:
        for im in (i.get("images") or []):
            if im not in cat_pools.setdefault("doors", []):
                cat_pools["doors"].append(im)
            if im not in cat_pools.setdefault("door-fittings", []):
                cat_pools["door-fittings"].append(im)

    # Paint / sanitary / safety may be empty on Easycon — borrow from construction chemical / doors
    if not cat_pools.get("paint-coating"):
        cat_pools["paint-coating"] = cat_pools.get("construction-chemical", [])[:6]
    if not cat_pools.get("sanitary-ware"):
        # try gazi from scraped
        gazi = [i for i in all_items if "gazi" in i.get("slug","")]
        pool = []
        for i in gazi:
            pool.extend(i.get("images") or [])
        cat_pools["sanitary-ware"] = pool or cat_pools.get("pipe-fitting", [])[:4]
    if not cat_pools.get("safety-equipment"):
        cat_pools["safety-equipment"] = cat_pools.get("door-fittings", [])[:4]

    # 2) Match our products
    assignments = {}  # our_slug -> [images]
    for our_slug, keywords in PRODUCT_MATCH.items():
        best = None
        best_score = 0
        for item in all_items:
            sc = score_match(our_slug, keywords, item)
            if sc > best_score and (item.get("images") or item.get("image")):
                best_score = sc
                best = item
        if best and best_score >= 2:
            assignments[our_slug] = (best.get("images") or [best["image"]])[:4]
            print(f"MATCH {our_slug:<40} <- {best['slug'][:40]} (score={best_score})")
        else:
            # fallback: category pool
            cat = CATEGORY_FOR_PRODUCT.get(our_slug, "")
            pool = cat_pools.get(cat, [])
            if pool:
                # pick 1-2 distinct images by hash of slug
                idx = abs(hash(our_slug)) % max(len(pool), 1)
                imgs = [pool[idx % len(pool)]]
                if len(pool) > 1:
                    imgs.append(pool[(idx + 1) % len(pool)])
                assignments[our_slug] = imgs
                print(f"POOL  {our_slug:<40} <- {cat} pool ({len(pool)} imgs)")
            else:
                print(f"MISS  {our_slug}")

    # Save scrape log
    out = {
        "scraped_count": len(all_items),
        "assignments": {k: v for k, v in assignments.items()},
        "category_pools": {k: v[:8] for k, v in cat_pools.items()},
    }
    with open("category_scrape_log.json", "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)

    # 3) Patch products.js
    js_path = os.path.join(os.path.dirname(__file__) or ".", "data", "products.js")
    with open(js_path, encoding="utf-8") as f:
        content = f.read()

    patched = 0
    for our_slug, images in assignments.items():
        if not images:
            continue
        imgs_js = ", ".join(f'"{u}"' for u in images)
        new_array = f"images:[{imgs_js}]"

        m = re.search(rf'(slug:\s*["\']){re.escape(our_slug)}(["\'])', content)
        if not m:
            continue
        start = m.start()
        # Match images array carefully — may contain IMG.x[n] or quoted URLs
        img_m = re.search(
            r'images:\[(?:[^\[\]]|\[[^\]]*\])*\]',
            content[start:start + 2500],
        )
        if not img_m:
            continue
        abs_s = start + img_m.start()
        abs_e = start + img_m.end()
        content = content[:abs_s] + new_array + content[abs_e:]
        patched += 1

    # 4) Update category images to first real image from pool
    for cat_slug, pool in cat_pools.items():
        if not pool:
            continue
        # categories use: slug:"cement-aggregate" ... image: IMG.xxx[0]
        cat_m = re.search(
            rf'(slug:\s*["\']{re.escape(cat_slug)}["\'][^}}]*?image:\s*)([^,}}]+)',
            content,
        )
        if cat_m:
            content = content[:cat_m.start(2)] + f'"{pool[0]}"' + content[cat_m.end(2):]
            print(f"CAT IMG {cat_slug} <- {pool[0][-50:]}")

    # 5) Update brand logos that still use _U(...) for brands we have product images for
    brand_logo_map = {
        "fresh": "fresh-ultra-strong-cement",
        "insee": "insee-cement",
        "bashundhara": "bashundhara-cement",
        "holcim": "holcim-cement",
        "seven-rings": "seven-rings-cement-gold",
        "bsrm": "bsrm-steel",
        "csrm": "csrm-steel",
        "gph-ispat": "gph-ispat-steel",
        "anwar-ispat": "anwar-ispat-steel",
        "sika": "sika-cim",
        "brb": "brb-cable-1x4-rm",
        "ag": "ag-2inch-gi-plug",
        "eco-ceramics": "eco-ceramics-ceramic-brick",
        "mirpur-ceramics": "mirpur-ceramics-10hole-facing",
        "mostafa-door": "mostafa-pvc-door",
        "ubc": "ubc-parking-tiles",
        "next": "next-aac-block",
    }
    for brand_slug, prod_slug in brand_logo_map.items():
        imgs = assignments.get(prod_slug)
        if not imgs:
            continue
        logo_url = imgs[0]
        bm = re.search(
            rf'(slug:\s*["\']{re.escape(brand_slug)}["\'][^}}]*?logo:\s*)([^,}}]+)',
            content,
        )
        if bm:
            content = content[:bm.start(2)] + f'"{logo_url}"' + content[bm.end(2):]

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\nDone. Patched {patched}/{len(PRODUCT_MATCH)} products in data/products.js")
    print("Log: category_scrape_log.json")


if __name__ == "__main__":
    main()
