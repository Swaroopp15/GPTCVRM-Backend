require('dotenv').config()
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    port: process.env.DB_PORT || 8000,
    password: process.env.DB_PASSWORD || 'Swaroop@15',
    database: process.env.DB_NAME,
    // connectionLimit: 10,
    multipleStatements: true
});

module.exports = db;
