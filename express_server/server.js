const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());


const pool = new Pool({
    host: 'db',
    user: 'postgres',
    password: 'postgres',
    database: 'mydb',
    port: 5432,
});


app.get('/btcusd_1h', async (req, res) => {
    const { from, to, min_volume } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: 'Missing from/to query params' });
    }
    let sql = `
    SELECT id, timestamp, open, high, low, close, volume
    FROM btcusd_1h
    WHERE timestamp BETWEEN $1 AND $2
  `;
    const params = [from, to];
    if (min_volume) {
        sql += ' AND volume >= $3';
        params.push(min_volume);
    }
    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error('Error in /btcusd_1h:', err);
        res.status(500).json({ error: err.message });
    }
});


app.get('/btcusd_1h_readable', async (req, res) => {
    const { from, to, min_volume } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: 'Missing from/to query params' });
    }
    let sql = `
    SELECT *
    FROM btcusd_1h_readable
    WHERE timestamp BETWEEN $1::timestamp AND $2::timestamp
  `;
    const params = [from, to];
    if (min_volume) {
        sql += ' AND volume >= $3';
        params.push(min_volume);
    }
    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error('Error in /btcusd_1h_readable:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/ohlc', async (req, res) => {
    const { interval, from, to } = req.query;
    if (!interval || !from || !to) {
        return res.status(400).json({ error: 'Must provide interval, from, and to' });
    }
    const sql = 'SELECT * FROM get_ohlc($1, $2, $3);';
    try {
        const { rows } = await pool.query(sql, [interval, from, to]);
        res.json(rows);
    } catch (err) {
        console.error('Error in /ohlc:', err);
        res.status(500).json({ error: err.message });
    }
});


app.get('/news_articles', async (req, res) => {
    const { from, to } = req.query;
    let sql = 'SELECT * FROM news_articles';
    const params = [];
    if (from && to) {
        sql += ' WHERE date BETWEEN $1::date AND $2::date';
        params.push(from, to);
    }
    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error('Error in /news_articles:', err);
        res.status(500).json({ error: err.message });
    }
});


app.get('/news_articles_sentiments', async (req, res) => {
    const { from, to } = req.query;
    let sql = 'SELECT * FROM news_articles_sentiments';
    const params = [];
    if (from && to) {
        sql += ' WHERE analysis_date BETWEEN $1::date AND $2::date';
        params.push(from, to);
    }
    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error('Error in /news_articles_sentiments:', err);
        res.status(500).json({ error: err.message });
    }
});


app.get('/news_with_sentiments', async (req, res) => {
    const { from, to } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: 'Missing from/to query params for news date range' });
    }
    const sql = `
    SELECT na.id,
           na.date,
           na.description,
           na.link,
           na.categories,
           na.source,
           na.content,
           nas.sentiment,
           nas.confidence,
           nas.analysis_date
    FROM news_articles na
    LEFT JOIN news_articles_sentiments nas ON na.id = nas.article_id
    WHERE na.date BETWEEN $1::date AND $2::date
    ORDER BY na.date ASC;
  `;
    try {
        const { rows } = await pool.query(sql, [from, to]);
        res.json(rows);
    } catch (err) {
        console.error('Error in /news_with_sentiments:', err);
        res.status(500).json({ error: err.message });
    }
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});



const PORT = 3000;
app.listen(PORT, () => console.log(`Express API running on port ${PORT}`));
