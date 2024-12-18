import express from "express";
import { pool } from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Clave secreta para JWT
const JWT_SECRET = "1234";

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];

        // Comparar la contraseña enviada con la almacenada (encriptada)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Crear un token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        // Enviar respuesta al cliente
        res.json({
            message: "Inicio de sesión exitoso",
            user: { id: user.id, email: user.email },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
});

// Puerto del servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://172.100.77.25:3000");
});
