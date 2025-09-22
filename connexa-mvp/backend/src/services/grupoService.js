const Grupo = require('../models/Grupo');

exports.criarGrupo = (dados, callback) => {
    // Validações podem ser feitas aqui
    Grupo.create(dados, callback);
};

exports.listarGrupos = (callback) => {
    Grupo.getAll(callback);
};