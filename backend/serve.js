import express from 'express';
import { pool } from './db.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para probar la conexión
app.get('/test', async (req, res) => {
    try {
        const [rows] = await pool.query('SHOW TABLES');
        res.json({ tables: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Puerto donde se ejecutará el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://172.100.77.25:3000');
});
