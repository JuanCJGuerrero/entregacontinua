const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database/bancoteste2.db');
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
    // Cria tabela grupos se não existir
    db.run(`CREATE TABLE IF NOT EXISTS grupos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeGrupo TEXT NOT NULL,
        visibilidade TEXT NOT NULL,
        integrantes TEXT NOT NULL -- Armazene como JSON string
    )`);
};

createTable();

module.exports = db;
