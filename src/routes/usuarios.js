var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/cadastrarMetricasQuizBandeira", function (req, res) {
    usuarioController.cadastrarMetricasQuizBandeira(req, res);
});

router.post("/cadastrarMetricasQuizPais", function (req, res) {
    usuarioController.cadastrarMetricasQuizPais(req, res);
});

router.get("/capturarMetricasBandeira/:idUsuario", function(req, res) {
    usuarioController.capturarMetricasBandeira(req, res)
})

router.get("/capturarMetricasCapital/:idUsuario", function(req, res) {
    usuarioController.capturarMetricasCapital(req, res)
})

module.exports = router;