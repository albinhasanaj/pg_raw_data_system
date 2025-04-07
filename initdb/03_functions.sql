CREATE OR REPLACE FUNCTION get_ohlc(
        in_interval TEXT,
        in_from BIGINT,
        in_to BIGINT
    ) RETURNS TABLE (
        id INT,
        human_ts TIMESTAMPTZ,
        open NUMERIC,
        high NUMERIC,
        low NUMERIC,
        close NUMERIC,
        volume NUMERIC
    ) AS $$ BEGIN IF in_interval = '1h' THEN RETURN QUERY
SELECT t.id,
    to_timestamp(t.timestamp) AS human_ts,
    t.open,
    t.high,
    t.low,
    t.close,
    t.volume
FROM btcusd_1h t
WHERE t.is_active = true
    AND t.timestamp BETWEEN in_from AND in_to;
ELSIF in_interval = '4h' THEN RETURN QUERY
SELECT t.id,
    to_timestamp(t.timestamp) AS human_ts,
    t.open,
    t.high,
    t.low,
    t.close,
    t.volume
FROM btcusd_4h t
WHERE t.is_active = true
    AND t.timestamp BETWEEN in_from AND in_to;
ELSIF in_interval = '1d' THEN RETURN QUERY
SELECT t.id,
    to_timestamp(t.timestamp) AS human_ts,
    t.open,
    t.high,
    t.low,
    t.close,
    t.volume
FROM btcusd_1d t
WHERE t.is_active = true
    AND t.timestamp BETWEEN in_from AND in_to;
ELSIF in_interval = '1w' THEN RETURN QUERY
SELECT t.id,
    to_timestamp(t.timestamp) AS human_ts,
    t.open,
    t.high,
    t.low,
    t.close,
    t.volume
FROM btcusd_1w t
WHERE t.is_active = true
    AND t.timestamp BETWEEN in_from AND in_to;
ELSIF in_interval = '1m' THEN RETURN QUERY
SELECT t.id,
    to_timestamp(t.timestamp) AS human_ts,
    t.open,
    t.high,
    t.low,
    t.close,
    t.volume
FROM btcusd_1m t
WHERE t.is_active = true
    AND t.timestamp BETWEEN in_from AND in_to;
ELSE RAISE EXCEPTION 'Unknown interval %; must be 1h, 4h, 1d, 1w, or 1m.',
in_interval;
END IF;
RETURN;
END;
$$ LANGUAGE plpgsql;