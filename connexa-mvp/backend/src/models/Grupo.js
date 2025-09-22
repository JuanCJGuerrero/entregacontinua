const db = require('../../backend/database');

class Grupo {
    static create({ nomeGrupo, visibilidade, integrantes }, callback) {
        const sql = `INSERT INTO grupos (nomeGrupo, visibilidade, integrantes) VALUES (?, ?, ?)`;
        db.run(sql, [nomeGrupo, visibilidade, JSON.stringify(integrantes)], function (err) {
            callback(err, this ? this.lastID : null);
        });
    }

    static getAll(callback) {
        db.all(`SELECT * FROM grupos`, [], (err, rows) => {
            if (err) return callback(err);
            const grupos = rows.map(g => ({
                nomeGrupo: g.nomeGrupo,
                visibilidade: g.visibilidade,
                integrantes: JSON.parse(g.integrantes)
            }));
            callback(null, grupos);
        });
    }
}

module.exports = Grupo;