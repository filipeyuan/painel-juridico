const express = require('express');
const router = express.Router();
const { listar, buscarPorId, metricas } = require('../controllers/atendimentosController');

router.get('/', listar);
router.get('/metricas', metricas);
router.get('/:id', buscarPorId);

module.exports = router;