const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database/conexa.db');
const db = new sqlite3.Database(dbPath);

// Cria tabela usuarios se não existir
const createTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeCompleto TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        curso TEXT NOT NULL,
        semestre INTEGER NOT NULL,
        senha TEXT NOT NULL
    )`);
};

createTable();

module.exports = db;
