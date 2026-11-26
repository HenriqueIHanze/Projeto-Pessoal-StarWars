var express = require("express");
var router = express.Router();

var resultadoController = require("../controllers/resultadoController");

router.get("/resumo/:idUsuario", function (req, res) {
    resultadoController.buscarResumo(req, res);
});

router.get("/acertos-por-pergunta/:idUsuario", function (req, res) {
    resultadoController.buscarAcertosPorPergunta(req, res);
});

router.get("/anakin-vs-vader/:idUsuario", function (req, res) {
    resultadoController.buscarAnakinVsVader(req, res);
});

module.exports = router;
