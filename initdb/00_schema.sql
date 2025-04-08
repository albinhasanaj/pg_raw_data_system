CREATE TABLE btcusd_1h (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC,
    volume NUMERIC,
    is_active BOOLEAN DEFAULT TRUE
);
CREATE TABLE btcusd_4h (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC,
    volume NUMERIC,
    is_active BOOLEAN DEFAULT TRUE
);
CREATE TABLE btcusd_1d (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC,
    volume NUMERIC,
    is_active BOOLEAN DEFAULT TRUE
);
CREATE TABLE btcusd_1w (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC,
    volume NUMERIC,
    is_active BOOLEAN DEFAULT TRUE
);
CREATE TABLE btcusd_1m (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC,
    volume NUMERIC,
    is_active BOOLEAN DEFAULT TRUE
);
CREATE TABLE news_articles (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    description TEXT,
    link TEXT,
    categories TEXT,
    source TEXT,
    content TEXT
);
CREATE TABLE news_articles_sentiments (
    id SERIAL PRIMARY KEY,
    article_id INT NOT NULL,
    sentiment TEXT,
    confidence NUMERIC,
    analysis_date DATE NOT NULL,
    FOREIGN KEY (article_id) REFERENCES news_articles(id) ON DELETE CASCADE
);
CREATE INDEX idx_btcusd_1h_timestamp ON btcusd_1h (timestamp);
CREATE INDEX idx_btcusd_4h_timestamp ON btcusd_4h (timestamp);
CREATE INDEX idx_btcusd_1d_timestamp ON btcusd_1d (timestamp);
CREATE INDEX idx_btcusd_1w_timestamp ON btcusd_1w (timestamp);
CREATE INDEX idx_btcusd_1m_timestamp ON btcusd_1m (timestamp);