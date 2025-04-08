const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/news_articles', async (req, res) => {
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

// Sentiments only
router.get('/news_articles_sentiments', async (req, res) => {
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

// Join: news + sentiments
router.get('/news_with_sentiments', async (req, res) => {
    const { from, to } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: 'Missing from/to query params' });
    }

    const sql = `
        SELECT na.id, na.date, na.description, na.link, na.categories,
               na.source, na.content, nas.sentiment, nas.confidence, nas.analysis_date
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

module.exports = router;