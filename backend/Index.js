import app from "./app.js";
import { PORT } from "./config.js";
import express from 'express';
import { pool } from './db.js';

app.get('/test', async (req, res) => {
    try {
        const [rows] = await pool.query('SHOW TABLES');
        res.json({ tables: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT);
console.log("Server running on port " + PORT);
