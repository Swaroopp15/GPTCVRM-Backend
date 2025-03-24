const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jayanth@14',
    database: 'gpt_cvrm',
    connectionLimit: 10
});

module.exports = db;
