// Endpoint para registrar un nuevo usuario
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "El correo ya está registrado" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const [result] = await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.status(201).json({
            message: "Usuario registrado con éxito",
            user: { id: result.insertId, username, email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
});
