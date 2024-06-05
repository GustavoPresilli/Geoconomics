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

idade_usuario.innerHTML += ` ${idade}`;
regiao_usuario.innerHTML += ` ${regiao}`;
nome_usuario.innerHTML += ` ${nome}`

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
                borderColor: 'rgb(255, 199, 132)',
                borderWidth: 1
            },
            {
                label: 'Quantidade de Erros',
                data: listaErrosBandeira,
                backgroundColor: 'red',
                borderColor: 'rgb(255, 199, 132)',
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
                plotarGraificoBarraCapital();
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

capturarDadosCapital();

function plotarGraificoBarraCapital() {
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
                borderColor: 'rgb(255, 199, 132)',
                borderWidth: 1
            },
            {
                label: 'Quantidade de Erros',
                data: listaErrosCapital,
                backgroundColor: 'red',
                borderColor: 'rgb(255, 199, 132)',
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

    graficoBarraCapital = new Chart(ctx, config);
}

function capturarPorcAcertos() {
    fetch(`/usuarios/capturarPorcAcertos/${idUsuario}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((metricas) => {
                porc_acerto.innerHTML += ` ${(metricas[0].porcentagem) == null ? "0" : (metricas[0].porcentagem)}%`
                numeros_porc.innerHTML = `Total de questões certas: ${metricas[0].qtdAcertosTotais == null ? "0" : metricas[0].qtdAcertosTotais} / ${metricas[0].total == null ? "0" : metricas[0].total}`
                // AJUDA
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

capturarPorcAcertos();