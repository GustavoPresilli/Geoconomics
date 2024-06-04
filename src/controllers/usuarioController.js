var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu e-mail undefined!");
    } else {
        usuarioModel
            .autenticar(email, senha).then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                    res.status(200).json(resultadoAutenticar);
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o login! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var usuario = req.body.usuarioServer;
    var dataNasc = req.body.dataNascServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var regiao = req.body.regiaoServer;
    var genero = req.body.generoServer;

    if (usuario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (dataNasc == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu e-mail está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (regiao == undefined) {
        res.status(400).send("Sua região está undefined!");
    } else if (genero == undefined) {
        res.status(400).send("Seu gênero está undefined!");
    } else {
        usuarioModel
            .cadastrar(usuario, dataNasc, email, senha, regiao, genero).then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrarMetricasQuizBandeira(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var qtdAcertos = req.body.qtdAcertosServer;
    var qtdErros = req.body.qtdErrosServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (qtdAcertos == undefined) {
        res.status(400).send("Sua quantidade de acertos está undefined!");
    } else if (qtdErros == undefined) {
        res.status(400).send("Sua quantidade de erros está undefined!");
    } else {
        usuarioModel
            .cadastrarMetricasQuizBandeira(idUsuario, qtdAcertos, qtdErros).then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function capturarMetricas(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.capturarMetricas(idUsuario).then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            }
            else {
                res.status(204).json([]);
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as métricas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarMetricasQuizBandeira,
    capturarMetricas
};
