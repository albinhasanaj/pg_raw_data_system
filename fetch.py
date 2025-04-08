import requests
import time

print("Running with PostgreSQL indexing...")

BASE_URL = "http://localhost:3000/ohlc"
FROM = 0
TO = 1700000000
INTERVAL = "1h"

def fetch_all():
    print("\n📦 Fetching ALL data (no limit, no offset)...")
    start = time.time()
    response = requests.get(BASE_URL, params={"interval": INTERVAL, "from": FROM, "to": TO})
    end = time.time()
    try:
        data = response.json()
        print(f"✅ {len(data)} rows fetched in {round((end - start) * 1000, 2)} ms")
    except Exception as e:
        print("❌ Failed to parse JSON:", e)

def fetch_paginated(limit, max_pages=5):
    print(f"\n📄 Fetching with pagination (limit={limit}, max_pages={max_pages})...")
    total_rows = 0
    page = 0
    while page < max_pages:
        offset = page * limit
        print(f"→ Page {page+1}: limit={limit}, offset={offset}")
        start = time.time()
        response = requests.get(BASE_URL, params={
            "interval": INTERVAL,
            "from": FROM,
            "to": TO,
            "limit": limit,
            "offset": offset
        })
        end = time.time()
        try:
            data = response.json()
            print(f"   ↳ {len(data)} rows in {round((end - start) * 1000, 2)} ms")
            if not data:
                print("   🛑 No more data.")
                break
            total_rows += len(data)
        except Exception as e:
            print("   ❌ JSON parse error:", e)
            break
        page += 1
    print(f"✅ Total rows fetched with pagination: {total_rows}")

def fetch_with_limit(limit):
    print(f"\n🎯 Fetching with static limit={limit} (no offset)...")
    start = time.time()
    response = requests.get(BASE_URL, params={
        "interval": INTERVAL,
        "from": FROM,
        "to": TO,
        "limit": limit
    })
    end = time.time()
    try:
        data = response.json()
        print(f"✅ {len(data)} rows fetched in {round((end - start) * 1000, 2)} ms")
    except Exception as e:
        print("❌ Failed to parse JSON:", e)

# Run all tests
fetch_all()
fetch_with_limit(1000)
fetch_paginated(limit=1000, max_pages=5)
fetch_paginated(limit=10000, max_pages=5)
fetch_paginated(limit=100000, max_pages=5)