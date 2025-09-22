const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

router.post('/grupos', grupoController.criarGrupo);
router.get('/grupos', grupoController.listarGrupos);

module.exports = router;