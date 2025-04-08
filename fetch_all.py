import requests
import time

BASE_URL = 'http://localhost:3000'

def timed_fetch(name, url):
    print(f"🔍 Fetching: {name}")
    start = time.time()
    response = requests.get(url)
    elapsed = time.time() - start
    if response.status_code == 200:
        print(f"✅ {name}: {len(response.json())} rows fetched in {elapsed:.2f} sec\n")
    else:
        print(f"❌ {name} failed with status {response.status_code}\n")

if __name__ == '__main__':
    from_ts = 0
    to_ts = 1700000000
    from_date = '2010-01-01'
    to_date = '2025-01-01'

    endpoints = [
        ("1h OHLC", f"{BASE_URL}/ohlc?interval=1h&from={from_ts}&to={to_ts}"),
        ("4h OHLC", f"{BASE_URL}/ohlc?interval=4h&from={from_ts}&to={to_ts}"),
        ("1d OHLC", f"{BASE_URL}/ohlc?interval=1d&from={from_ts}&to={to_ts}"),
        ("1w OHLC", f"{BASE_URL}/ohlc?interval=1w&from={from_ts}&to={to_ts}"),
        ("1m OHLC", f"{BASE_URL}/ohlc?interval=1m&from={from_ts}&to={to_ts}"),
        ("News Articles", f"{BASE_URL}/news_articles?from={from_date}&to={to_date}"),
        ("News Article Sentiments", f"{BASE_URL}/news_articles_sentiments?from={from_date}&to={to_date}"),
        ("News With Sentiments", f"{BASE_URL}/news_with_sentiments?from={from_date}&to={to_date}"),
    ]

    total_start = time.time()
    for name, url in endpoints:
        timed_fetch(name, url)
    total_time = time.time() - total_start
    print(f"🧠 Total time for all fetches: {total_time:.2f} sec")
