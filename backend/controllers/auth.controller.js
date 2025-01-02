import { pool } from "../db.js";
import bcrypt from "bcrypt";

// Inicio de sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user[0].user_password);

    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({
      message: "Inicio de sesión exitoso",
      user: { id: user[0].id, username: user[0].username, email: user[0].email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Registro de usuario
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, email, user_password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Obtener perfil del usuario
export const getProfile = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "El correo electrónico es obligatorio" });
  }

  try {
    const [user] = await pool.query(
      "SELECT id, username, email FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ user: user[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Actualizar nombre de usuario
export const updateUsername = async (req, res) => {
  try {
    const { id, newUsername } = req.body;
    console.log(req.body.username);
    await pool.query("UPDATE users SET username = ? WHERE id = ?", [
      req.body.username,
      id,
    ]);

    return res
      .status(200)
      .json({ message: "Nombre de usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el nombre de usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar correo electrónico
export const updateEmail = async (req, res) => {
  const { id, newEmail } = req.body;

  if (!id || !newEmail) {
    return res
      .status(400)
      .json({ message: "Faltan campos requeridos (id, correo)" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    if (user.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const emailExists = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [newEmail]
    );

    if (emailExists.rowCount > 0) {
      return res.status(409).json({ message: "El correo ya está en uso" });
    }

    await pool.query("UPDATE users SET email = ? WHERE id = ?", [newEmail, id]);

    return res
      .status(200)
      .json({ message: "Correo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el correo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar contraseña
export const updatePassword = async (req, res) => {
  const { id, newPassword } = req.body;

  if (!id || !newPassword) {
    return res
      .status(400)
      .json({ message: "Faltan campos requeridos (id, contraseña)" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    if (user.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE users SET user_password = ? WHERE id = ?", [
      hashedPassword,
      id,
    ]);

    return res
      .status(200)
      .json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await pool.query("DELETE FROM users WHERE email = ?", [
      email,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};