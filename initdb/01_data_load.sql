COPY btcusd_1h(id, timestamp, open, high, low, close, volume)
FROM '/docker-entrypoint-initdb.d/BTCUSD_1H.csv' CSV HEADER;
COPY btcusd_4h(id, timestamp, open, high, low, close, volume)
FROM '/docker-entrypoint-initdb.d/BTCUSD_4H.csv' CSV HEADER;
COPY btcusd_1d(id, timestamp, open, high, low, close, volume)
FROM '/docker-entrypoint-initdb.d/BTCUSD_1D.csv' CSV HEADER;
COPY btcusd_1w(id, timestamp, open, high, low, close, volume)
FROM '/docker-entrypoint-initdb.d/BTCUSD_1W.csv' CSV HEADER;
COPY btcusd_1m(id, timestamp, open, high, low, close, volume)
FROM '/docker-entrypoint-initdb.d/BTCUSD_1M.csv' CSV HEADER;
COPY news_articles
FROM '/docker-entrypoint-initdb.d/news_articles.csv' CSV HEADER;
COPY news_articles_sentiments
FROM '/docker-entrypoint-initdb.d/news_articles_sentiments.csv' CSV HEADER;