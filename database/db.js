require('dotenv').config()
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD || 'jayanth@14',
    database: 'gpt_cvrm',
    // connectionLimit: 10,
    multipleStatements: true
});

module.exports = db;
