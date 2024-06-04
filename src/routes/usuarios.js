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

router.get("/capturarMetricas/:idUsuario", function(req, res) {
    usuarioController.capturarMetricas(req, res)
})

module.exports = router;