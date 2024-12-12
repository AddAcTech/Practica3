import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',       // Cambia si estás usando otro servidor
    user: 'root',            // Usuario de tu base de datos
    password: '',            // Contraseña (por defecto es vacía en XAMPP)
    database: 'login', // Nombre de la base de datos
});
