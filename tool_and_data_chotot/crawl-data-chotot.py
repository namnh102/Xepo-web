import requests
import csv
import json
import os
import time


def parse_vehicle_simple(ad):
    return {
        "subject": ad.get("subject"),       # tên sản phẩm
        "body": ad.get("body"),             # mô tả
        "price": ad.get("price"),           # giá (số)
        "price_string": ad.get("price_string"), # giá (chuỗi hiển thị)
        "image": ad.get("image"),           # ảnh chính
        "thumbnail_image": ad.get("thumbnail_image"),
        "webp_image": ad.get("webp_image"),
        "images": ", ".join(ad.get("images", [])),  # nhiều ảnh nếu có
    }

# --- Crawl nhiều trang ---
def crawl_chotot_vehicle_simple(limit=50, max_page=120,
                                save_csv="data/chotot_vehicle_simple.csv",
                                save_json="data/chotot_vehicle_simple.json"):
    os.makedirs(os.path.dirname(save_csv), exist_ok=True)
    all_ads = []

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

    for page in range(1, max_page + 1):
        url = f"https://gateway.chotot.com/v1/public/ad-listing-video?cg=2000&st=s%2Ck&source=listing&limit={limit}&page={page}&key_param_included=true&video_count_included=true"
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            data = resp.json()
            ads = data.get("ads", [])
            for ad in ads:
                all_ads.append(parse_vehicle_simple(ad))
            print(f" Page {page}/{max_page} done, total ads: {len(all_ads)}")
            time.sleep(1)  # nghỉ tránh bị block
        except Exception as e:
            print(f" Error on page {page}: {e}")

    # Lưu JSON
    with open(save_json, "w", encoding="utf-8") as f:
        json.dump(all_ads, f, ensure_ascii=False, indent=4)

    # Lưu CSV
    if all_ads:
        keys = all_ads[0].keys()
        with open(save_csv, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=keys)
            writer.writeheader()
            writer.writerows(all_ads)

    print(f" Saved {len(all_ads)} ads to {save_csv} and {save_json}")


# --- Chạy crawl (6000 tin: 50 * 120) ---
crawl_chotot_vehicle_simple(limit=50, max_page=120,
                            save_csv="data/xe.csv",
                            save_json="data/xe.json")
