const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('bancoteste2.db');

// Cria tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeCompleto TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    curso TEXT NOT NULL,
    semestre INTEGER NOT NULL,
    senha TEXT NOT NULL
)`);

app.post('/api/usuarios/cadastro', (req, res) => {
    const { nomeCompleto, email, curso, semestre, senha } = req.body;
    db.run(
        `INSERT INTO usuarios (nomeCompleto, email, curso, semestre, senha) VALUES (?, ?, ?, ?, ?)`,
        [nomeCompleto, email, curso, semestre, senha],
        function (err) {
            if (err) {
                return res.status(400).json({ erro: 'E-mail já cadastrado ou dados inválidos.' });
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});