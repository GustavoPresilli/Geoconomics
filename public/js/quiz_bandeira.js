var idUsuario = sessionStorage.ID_USUARIO;

resultado.style.display = "none";
const quizData = [
    {
        question: "<img src='assets/img/flags/bandeira_brasil.png'>",
        options: ["Brasil", "Alemanha", "China", "Estados Unidos"],
        correct: "Brasil"
    },
    {
        question: "<img src='assets/img/flags/bandeira_franca.png'>",
        options: ["Holanda", "Russia", "Luxemburgo", "França"],
        correct: "França"
    },
    {
        question: "<img src='assets/img/flags/bandeira_dinamarca.png'>",
        options: ["Dinamarca", "Suécia", "Noruega", "Finlândia"],
        correct: "Dinamarca"
    },
    {
        question: "<img src='assets/img/flags/bandeira_espanha.png'>",
        options: ["Alemanha", "Espanha", "Portugal", "Inglaterra"],
        correct: "Espanha"
    },
    {
        question: "<img src='assets/img/flags/bandeira_japao.png'>",
        options: ["Palau", "Coreia do Sul", "China", "Japão"],
        correct: "Japão"
    },
    {
        question: "<img src='assets/img/flags/bandeira_panama.png'>",
        options: ["Panamá", "Argélia", "Nicarágua", "Belize"],
        correct: "Panamá"
    },
    {
        question: "<img src='assets/img/flags/bandeira_indonesia.png'>",
        options: ["Cingapura", "Indonésia", "Polônia", "Tunísia"],
        correct: "Indonésia"
    },
    {
        question: "<img src='assets/img/flags/bandeira_colombia.png'>",
        options: ["Romania", "Equador", "Venezuela", "Colômbia"],
        correct: "Colômbia"
    },
    {
        question: "<img src='assets/img/flags/bandeira_estonia.png'>",
        options: ["Ucrânia", "Letônia", "Estônia", "Austria"],
        correct: "Estônia"
    },
    {
        question: "<img src='assets/img/flags/bandeira_tunisia.png'>",
        options: ["Azerbaijão", "Argélia", "Tunísia", "Turquia"],
        correct: "Tunísia"
    },
    {
        question: "<img src='assets/img/flags/bandeira_palau.png'>",
        options: ["Japão", "Palau", "Micronésia", "Bangladesh"],
        correct: "Palau"
    },
    {
        question: "<img src='assets/img/flags/bandeira_vanuatu.png'>",
        options: ["Afica do Sul", "Vanuatu", "Papua Nova-Guiné", "Guinè"],
        correct: "Vanuatu"
    },
    {
        question: "<img src='assets/img/flags/bandeira_lichestein.png'>",
        options: ["Haiti", "Liechtenstein", "Mongólia", "Chéquia"],
        correct: "Liechtenstein"
    },
    {
        question: "<img src='assets/img/flags/bandeira_kiribati.png'>",
        options: ["Nova Zelândia", "Nepal", "Kiribati", "Samoa"],
        correct: "Kiribati"
    },
    {
        question: "<img src='assets/img/flags/bandeira_quirguistao.png'>",
        options: ["Quirguistão", "Mongólia", "Macedônia", "Taiwan"],
        correct: "Quirguistão"
    },
];

var questaoAtual = 0; //  Indice da pergunta atual
var qtdAcertos = 0;  // Contador de acertos
var qtdErros = 0;

function carregarQuestao() {
    const currentQuestion = quizData[questaoAtual];
    bandeira.innerHTML = currentQuestion.question;
    opcoesResposta.innerHTML = '';

    for (var i = 0; i < currentQuestion.options.length; i++) {
        let opcaoAtual = currentQuestion.options[i]

        let opcaoResposta = document.createElement('li');

        opcaoResposta.innerText = opcaoAtual;

        // Criando a função da opção selecionada
        opcaoResposta.onclick = () => selectOption(opcaoResposta, opcaoAtual)

        // Usando apend child para definir qual é o pai 
        opcoesResposta.appendChild(opcaoResposta);
    }

}


carregarQuestao();
// Carregar a primeira questão;

numQuestao.innerHTML = `Questão ${questaoAtual + 1} de ${quizData.length}`

// Função para selecionar a opção
function selectOption(optionElement, option) {
    const selected = document.querySelector('.options li.selected');
    if (selected) {
        selected.classList.remove('selected');
        selected.id = ""; // Remove o ID do elemento desmarcado
    }
    optionElement.classList.add('selected');
    optionElement.id = "selecionado";
}

// Passando para a próxima pergunta aumentando seu contador
function proximaQuestao() {
    var questaoAtualMostrada = quizData[questaoAtual];
    var respostaSelecionada = selecionado.innerHTML;

    if (questaoAtualMostrada.correct === respostaSelecionada) {
        qtdAcertos++
    } else {
        qtdErros++
    }

    console.log(qtdAcertos);
    console.log(qtdErros)
    questaoAtual++;

    if (questaoAtual < quizData.length) {
        carregarQuestao();
        numQuestao.innerHTML = `Questão ${questaoAtual + 1} de ${quizData.length}`
    } else {
        fetch(`/usuarios/cadastrarMetricasQuizBandeira`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                qtdAcertosServer: qtdAcertos,
                qtdErrosServer: qtdErros
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {

                    console.log("Cadastro realizado")
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        mostrarResultados();
    }
}


function mostrarResultados() {
    quiz_container.style.display = "none";
    resultado.style.display = "block"
    div_mensagem.innerHTML = `Você acertou um total de ${qtdAcertos} perguntas`
}

function reiniciar() {
    window.location = "quiz_bandeiras.html";
}

function ir_resultados() {
    window.location = "curiosidade.html#resultados";
}

function sair() {
    window.location = "curiosidade.html"
}