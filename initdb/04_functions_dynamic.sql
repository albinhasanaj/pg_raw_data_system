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
    ) AS $$ BEGIN IF in_interval NOT IN ('1h', '4h', '1d', '1w', '1m') THEN RAISE EXCEPTION 'Invalid interval. Must be one of: 1h, 4h, 1d, 1w, 1m.';
END IF;
RETURN QUERY EXECUTE format(
    'SELECT id, to_timestamp(timestamp) AS human_ts, open, high, low, close, volume
         FROM %I
         WHERE is_active = true AND timestamp BETWEEN $1 AND $2',
    'btcusd_' || in_interval
) USING in_from,
in_to;
END;
$$ LANGUAGE plpgsql;