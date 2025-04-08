// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/btcusd/:timeframe', async (req, res) => {
    const { timeframe } = req.params;
    const { from, to, min_volume } = req.query;

    if (!from || !to) {
        return res.status(400).json({ error: 'Missing from/to query params' });
    }

    const table = `btcusd_${timeframe}`;
    let sql = `SELECT id, timestamp, open, high, low, close, volume FROM ${table} WHERE timestamp BETWEEN $1 AND $2`;
    const params = [from, to];

    if (min_volume) {
        sql += ' AND volume >= $3';
        params.push(min_volume);
    }

    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error(`Error in /btcusd/${timeframe}:`, err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/btcusd_readable/:timeframe', async (req, res) => {
    const { timeframe } = req.params;
    const { from, to, min_volume } = req.query;

    if (!from || !to) {
        return res.status(400).json({ error: 'Missing from/to query params' });
    }

    const table = `btcusd_${timeframe}_readable`;
    let sql = `SELECT * FROM ${table} WHERE timestamp BETWEEN $1::timestamp AND $2::timestamp`;
    const params = [from, to];

    if (min_volume) {
        sql += ' AND volume >= $3';
        params.push(min_volume);
    }

    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error(`Error in /btcusd_readable/${timeframe}:`, err);
        res.status(500).json({ error: err.message });
    }
});

// Route for get_ohlc SQL function
router.get('/ohlc', async (req, res) => {
    const { interval, from, to, limit, offset } = req.query;
    if (!interval || !from || !to) {
        return res.status(400).json({ error: 'Must provide interval, from, and to' });
    }

    let sql = 'SELECT * FROM get_ohlc($1, $2, $3)';
    const params = [interval, from, to];

    if (limit) sql += ` LIMIT ${parseInt(limit, 10)}`;
    if (offset) sql += ` OFFSET ${parseInt(offset, 10)}`;

    try {
        const start = Date.now();
        const { rows } = await pool.query(sql, params);
        console.log(`Query took ${Date.now() - start} ms`);
        res.json(rows);
    } catch (err) {
        console.error('Error in /ohlc:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;