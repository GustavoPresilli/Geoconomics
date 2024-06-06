function atualizarHorario(elemento, timeZone) {
    var dataAtual = new Date();
    elemento.innerHTML = `${dataAtual.toLocaleTimeString('pt-BR', { timeZone: timeZone })}`;
}

atualizarHorario(horarioTitulo, 'America/Sao_Paulo');
atualizarHorario(horarioEuropa, 'GMT');
atualizarHorario(horarioAmerica, 'America/New_York');
atualizarHorario(horarioAsia, 'Asia/Hong_Kong');
atualizarHorario(horarioAfrica, 'Africa/Cairo');
atualizarHorario(horarioOceania, 'Australia/Sydney');
atualizarHorario(horarioAnt, 'Pacific/Auckland');

setInterval(() => {
    atualizarHorario(horarioTitulo, 'America/Sao_Paulo');
    atualizarHorario(horarioEuropa, 'GMT');
    atualizarHorario(horarioAmerica, 'America/New_York');
    atualizarHorario(horarioAsia, 'Asia/Hong_Kong');
    atualizarHorario(horarioAfrica, 'Africa/Cairo');
    atualizarHorario(horarioOceania, 'Australia/Sydney');
    atualizarHorario(horarioAnt, 'Pacific/Auckland');
}, 1000);

function sair() {
    window.location = "index.html"
}

var idade = sessionStorage.IDADE_USUARIO;
var regiao = sessionStorage.REGIAO_USUARIO;
var nome = sessionStorage.NOME_USUARIO;
var idUsuario = sessionStorage.ID_USUARIO;


function buscarDadosUsuario() {
    fetch(`/usuarios/buscarDadosUsuario/${idUsuario}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((dados) => {
                idade_usuario.innerHTML += ` ${dados[0].idade}`;
                regiao_usuario.innerHTML += ` ${dados[0].regiao}`;
                nome_usuario.innerHTML += ` ${dados[0].nome}`

            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function quiz_bandeira() {
    window.location.href = 'quiz_bandeiras.html';
}

function quiz_capital() {
    window.location.href = 'quiz_capital.html';
}

var listaLabelBandeira = [];
var listaAcertosBandeira = [];
var listaErrosBandeira = [];

let graficoBarraBandeira;

function capturarDadosBandeira() {
    fetch(`/usuarios/capturarMetricasBandeira/${idUsuario}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((metricas) => {
                for (var i = metricas.length - 1; i >= 0; i--) {
                    var metricaAtual = metricas[i];
                    var data = new Date(metricaAtual.dtTentativa)

                    listaLabelBandeira.push(data.toLocaleString())
                    listaAcertosBandeira.push(metricaAtual.qtdAcertos)
                    listaErrosBandeira.push(metricaAtual.qtdErros)
                }
                plotarGraificoBarraBandeira();
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

capturarDadosBandeira();

function plotarGraificoBarraBandeira() {
    if (graficoBarraBandeira) {
        graficoBarraBandeira.destroy(); // Destroy the existing chart if it exists
    }

    const ctx = document.getElementById('graficoBarraBandeira');

    const data = {
        labels: listaLabelBandeira,
        datasets: [
            {
                label: 'Quantidade de Acertos',
                data: listaAcertosBandeira,
                backgroundColor: 'green',
                borderColor: '#A4EA4F',
                borderWidth: 1
            },
            {
                label: 'Quantidade de Erros',
                data: listaErrosBandeira,
                backgroundColor: 'red',
                borderColor: 'white',
                borderWidth: 1
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        },
    };

    graficoBarraBandeira = new Chart(ctx, config);
}

var listaLabelCapital = [];
var listaAcertosCapital = [];
var listaErrosCapital = [];

let graficoBarraCapital;

function capturarDadosCapital() {
    fetch(`/usuarios/capturarMetricasCapital/${idUsuario}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((metricas) => {
                for (var i = metricas.length - 1; i >= 0; i--) { // Adjusted the condition
                    var metricaAtual = metricas[i];
                    var data = new Date(metricaAtual.dtTentativa)

                    listaLabelCapital.push(data.toLocaleString())
                    listaAcertosCapital.push(metricaAtual.qtdAcertos)
                    listaErrosCapital.push(metricaAtual.qtdErros)
                }

                plotarGraficoBarraCapital();
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

capturarDadosCapital();

function plotarGraficoBarraCapital() {
    if (graficoBarraCapital) {
        graficoBarraCapital.destroy(); // Destroy the existing chart if it exists
    }

    const ctx = document.getElementById('graficoBarraCapital');

    const data = {
        labels: listaLabelCapital,
        datasets: [
            {
                label: 'Quantidade de Acertos',
                data: listaAcertosCapital,
                backgroundColor: 'green',
                borderColor: '#A4EA4F',
                borderWidth: 1
            },
            {
                label: 'Quantidade de Erros',
                data: listaErrosCapital,
                backgroundColor: 'red',
                borderColor: 'white',
                borderWidth: 1
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        },
    };

    graficoBarraCapital = new Chart(ctx, config);
}

function capturarPorcAcertos() {
    fetch(`/usuarios/capturarPorcAcertos/${idUsuario}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((metricas) => {
                porc_acerto.innerHTML += ` ${(metricas[0].porcentagem) == null ? "0" : Number((metricas[0].porcentagem)).toFixed(2)}%`
                numeros_porc.innerHTML = `Total de questões certas: ${metricas[0].qtdAcertosTotais == null ? "0" : metricas[0].qtdAcertosTotais} / ${metricas[0].total == null ? "0" : metricas[0].total}`
                // AJUDA
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

capturarPorcAcertos();

var listaLabelFaixa = []
var listaQuantidade = [];

function capturarQuantidadeFaixaEtaria() {
    fetch(`/usuarios/quantidadeFaixaEtaria`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((quantidade) => {
                var cont15_30 = 0;
                var cont31_45 = 0;
                var cont46_60 = 0;

                for (var i = 0; i < quantidade.length; i++) {
                    var idadeAtual = quantidade[i].idade;

                    if (idadeAtual >= 0 && idadeAtual <= 30) {
                        cont15_30++
                    } else if (idadeAtual <= 45) {
                        cont31_45++
                    } else {
                        cont46_60++
                    }

                }

                listaQuantidade.push(cont15_30)
                listaQuantidade.push(cont31_45)
                listaQuantidade.push(cont46_60)
                plotarGraficoTortaFaixaEtaria();
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

capturarQuantidadeFaixaEtaria()

var listaLabelRegiao = [];
var listaQuantidadeRegiao = [];

function capturarRegioes() {
    fetch(`/usuarios/quantidadeRegiao`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((regiao) => {
                for (var i = 0; i < regiao.length; i++) {
                    var regiaoAtual = regiao[i].regiao;
                    var quantidadeRegiaoAtual = regiao[i].quantidade;

                    listaLabelRegiao.push(regiaoAtual);
                    listaQuantidadeRegiao.push(quantidadeRegiaoAtual)

                }

                plotarGraificoBarraRegiao()
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

capturarRegioes()

var listaQuantidadeGenero = [];

function capturarGenero() {
    fetch(`/usuarios/quantidadeGenero`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((genero) => {
                var contMasc = 0;
                var contFem = 0;
                var contPNI = 0;

                for (var i = 0; i < genero.length; i++) {
                    var generoAtual = genero[i].genero;

                    if (generoAtual == "Feminino") {
                        contFem++
                    } else if (generoAtual == "Masculino") {
                        contMasc++
                    } else {
                        contPNI++
                    }


                }
                listaQuantidadeGenero.push(contMasc)
                listaQuantidadeGenero.push(contFem)
                listaQuantidadeGenero.push(contPNI)

                plotarGraficoTortaGenero()
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

capturarGenero();

let graficoTortaFaixa;

function plotarGraficoTortaFaixaEtaria() {
    if (graficoTortaFaixa) {
        graficoTortaFaixa.destroy(); // Destroy the existing chart if it exists
    }

    const ctx = document.getElementById('graficoTortaFaixa');

    const data = {
        labels: [
            'Entre 15 e 30',
            'Entre 31 e 45',
            'Entre 46 e 60'
        ],
        datasets: [{
            label: 'Quantidade',
            data: listaQuantidade,
            backgroundColor: [
                '#009B3A',
                '#F46E16',
                '#EF391F'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie',
        data: data,
    };

    graficoTortaFaixa = new Chart(ctx, config);
}

let graficoBarraRegiao;

function plotarGraificoBarraRegiao() {
    if (graficoBarraRegiao) {
        graficoBarraRegiao.destroy(); // Destroy the existing chart if it exists
    }

    const ctx = document.getElementById('graficoBarraRegiao');

    const data = {
        labels: listaLabelRegiao,
        datasets: [
            {
                label: "Quantidade",
                data: listaQuantidadeRegiao,
                backgroundColor: 'yellow',
                borderColor: 'white',
                borderWidth: 1
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    graficoBarraRegiao = new Chart(ctx, config);
}

let graficoTortaGenero;

function plotarGraficoTortaGenero() {
    if (graficoTortaGenero) {
        graficoTortaGenero.destroy(); // Destroy the existing chart if it exists
    }

    const ctx = document.getElementById('graficoTortaGenero');

    const data = {
        labels: [
            'Masculino',
            'Feminino',
            'Prefiro não informar'
        ],
        datasets: [{
            label: 'Faixa',
            data: listaQuantidadeGenero,
            backgroundColor: [
                '#002776',     // Masculino em azul
                '#FF607F',     // Feminino em rosa
                '#D6D2D2'     // Prefiro não informar em preto
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie',
        data: data,
    };

    graficoTortaGenero = new Chart(ctx, config);
}

function editar() {
    window.location = "editar.html"
}