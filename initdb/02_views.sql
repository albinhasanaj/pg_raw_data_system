CREATE VIEW btcusd_1h_readable AS
SELECT id,
    to_timestamp(timestamp) AS timestamp,
    open,
    high,
    low,
    close,
    volume
FROM btcusd_1h;
CREATE VIEW btcusd_4h_readable AS
SELECT id,
    to_timestamp(timestamp) AS timestamp,
    open,
    high,
    low,
    close,
    volume
FROM btcusd_4h;
CREATE VIEW btcusd_1d_readable AS
SELECT id,
    to_timestamp(timestamp) AS timestamp,
    open,
    high,
    low,
    close,
    volume
FROM btcusd_1d;
CREATE VIEW btcusd_1w_readable AS
SELECT id,
    to_timestamp(timestamp) AS timestamp,
    open,
    high,
    low,
    close,
    volume
FROM btcusd_1w;
CREATE VIEW btcusd_1m_readable AS
SELECT id,
    to_timestamp(timestamp) AS timestamp,
    open,
    high,
    low,
    close,
    volume
FROM btcusd_1m;