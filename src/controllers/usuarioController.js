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

function cadastrarMetricasQuizPais(req, res) {
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
            .cadastrarMetricasQuizPais(idUsuario, qtdAcertos, qtdErros).then(function (resultado) {
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

function capturarMetricasBandeira(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.capturarMetricasBandeira(idUsuario).then((resultado) => {
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

function capturarMetricasCapital(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.capturarMetricasCapital(idUsuario).then((resultado) => {
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

function capturarPorcAcertos(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.capturarPorcAcertos(idUsuario).then((resultado) => {
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

function quantidadeFaixaEtaria(req, res) {
    usuarioModel.quantidadeFaixaEtaria().then((resultado) => {
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


function quantidadeRegiao(req, res) {
    usuarioModel.quantidadeRegiao().then((resultado) => {
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

function quantidadeGenero(req, res) {
    usuarioModel.quantidadeGenero().then((resultado) => {
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

function capturarDadosUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.capturarDadosUsuario(idUsuario).then((resultado) => {
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

function editarDadosUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    var nome = req.body.nomeServer;
    var dtNasc = req.body.dtNascServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var urlImagem = req.body.urlImagemServer;
    var genero = req.body.generoServer;
    var regiao = req.body.regiaoServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu e-mail está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (genero == undefined) {
        res.status(400).send("Seu genero está undefined!");
    } else if (regiao == undefined) {
        res.status(400).send("Sua região está undefined!");
    } else {
        usuarioModel.editarDadosUsuario(idUsuario, nome, dtNasc, email, senha, urlImagem, genero, regiao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function buscarDadosUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.buscarDadosUsuario(idUsuario).then((resultado) => {
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
    cadastrarMetricasQuizPais,
    capturarMetricasBandeira,
    capturarMetricasCapital,
    capturarPorcAcertos,
    quantidadeFaixaEtaria,
    quantidadeRegiao,
    quantidadeGenero,
    capturarDadosUsuario,
    editarDadosUsuario,
    buscarDadosUsuario
};
