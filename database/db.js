require('dotenv').config()
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    port: process.env.DB_PORT || 8000,
    password: process.env.DB_PASSWORD || 'Swaroop@15',
    database: 'gpt_cvrm',
    connectionLimit: 10
});

module.exports = db;
