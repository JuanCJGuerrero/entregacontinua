const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database('./bancoteste2.db');

// Cria a tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS grupos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    descricao TEXT
)`);

// Rota para receber dados do grupo
app.post('/api/grupo', (req, res) => {
    const { nome, descricao } = req.body;
    db.run(
        'INSERT INTO grupos (nome, descricao) VALUES (?, ?)',
        [nome, descricao],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        }
    );
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});