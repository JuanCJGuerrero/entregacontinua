const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./database');

const app = express();
app.use(express.json()); 


// Endpoint de cadastro de usuário
app.post('/api/usuarios/cadastro', async (req, res) => {
    const { nomeCompleto, email, curso, semestre, senha } = req.body;

    // Validação do email institucional
    if (!/^.+@alunos\.unisanta\.br$/.test(email)) {
        return res.status(400).json({ erro: 'Email deve ser institucional (@alunos.unisanta.br)' });
    }

    // Hash da senha
    let hash;
    try {
        hash = await bcrypt.hash(senha, 10);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao gerar hash da senha' });
    }

    // Inserção no banco
    const sql = `INSERT INTO usuarios (nomeCompleto, email, curso, semestre, senha) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [nomeCompleto, email, curso, semestre, hash], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed: usuarios.email')) {
                return res.status(409).json({ erro: 'Email já cadastrado' });
            }
            return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
        }
        return res.status(201).json({ id: this.lastID });
    });
}); 

// Endpoint para criar grupo
app.post('/api/grupos', (req, res) => {
    const { nomeGrupo, visibilidade, integrantes } = req.body;
    if (!nomeGrupo || !visibilidade || !Array.isArray(integrantes)) {
        return res.status(400).json({ erro: 'Dados inválidos' });
    }
    const sql = `INSERT INTO grupos (nomeGrupo, visibilidade, integrantes) VALUES (?, ?, ?)`;
    db.run(sql, [nomeGrupo, visibilidade, JSON.stringify(integrantes)], function (err) {
        if (err) return res.status(500).json({ erro: 'Erro ao cadastrar grupo' });
        res.status(201).json({ id: this.lastID });
    });
});

// Endpoint para listar grupos
app.get('/api/grupos', (req, res) => {
    db.all(`SELECT * FROM grupos`, [], (err, rows) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar grupos' });
        // Parse integrantes de JSON string para array
        const grupos = rows.map(g => ({
            nomeGrupo: g.nomeGrupo,
            visibilidade: g.visibilidade,
            integrantes: JSON.parse(g.integrantes)
        }));
        res.json(grupos);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
