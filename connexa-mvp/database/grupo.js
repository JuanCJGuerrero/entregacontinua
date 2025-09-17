const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database('./bancoteste2.db');

// Cria a tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS grupos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomedogrupo TEXT,
    integrantes TEXT, 
    visibilidade TEXT DEFAULT 'privado'
)`);

// Rota para receber dados do grupo
app.post('/api/grupo', (req, res) => {
    const { nomedogrupo, integrantes,visibilidade } = req.body;
    db.run(
        'INSERT INTO grupos (nome do grupo, integrantes,visibilidade) VALUES (?, ?)',
        [nomedogrupo, integrantes,visibilidade],
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