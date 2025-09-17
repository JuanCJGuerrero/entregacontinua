const { app } = require('@azure/functions');
const sqlite3 = require('sqlite3').verbose();

app.http('CadastroUsuario', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        let body;
        try {
            body = await request.json();
        } catch (e) {
            return { status: 400, body: { erro: 'JSON inválido.' } };
        }

        const { nomeCompleto, email, curso, semestre, senha } = body || {};
        if (!nomeCompleto || !email || !curso || !semestre || !senha) {
            return { status: 400, body: { erro: 'Dados incompletos.' } };
        }

        return new Promise((resolve) => {
            const db = new sqlite3.Database('bancoteste2.db');
            db.run(
                `CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nomeCompleto TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    curso TEXT NOT NULL,
                    semestre INTEGER NOT NULL,
                    senha TEXT NOT NULL
                )`,
                () => {
                    db.run(
                        `INSERT INTO usuarios (nomeCompleto, email, curso, semestre, senha) VALUES (?, ?, ?, ?, ?)`,
                        [nomeCompleto, email, curso, semestre, senha],
                        function (err) {
                            db.close();
                            if (err) {
                                resolve({ status: 400, body: { erro: 'E-mail já cadastrado ou dados inválidos.' } });
                            } else {
                                resolve({ status: 201, body: { id: this.lastID } });
                            }
                        }
                    );
                }
            );
        });
    }
});
