var idUsuario = sessionStorage.ID_USUARIO;

resultado.style.display = "none";
const quizData = [
    {
        question: "Qual a capital da <span>Alemanha</span> ?",
        options: ["Berlim", "Moscou", "Pequim", "Tóquio"],
        correct: "Berlim"
    },
    {
        question: "Qual a capital da <span>Rússia</span> ?",
        options: ["Madrid", "Moscou", "Amsterdam", "Paris"],
        correct: "Moscou"
    },
    {
        question: "Qual a capital da <span>Noruega</span> ?",
        options: ["Estocolmo", "Helsing", "Oslo", "Lisboa"],
        correct: "Oslo"
    },
    {
        question: "Qual a capital da <span>Irlanda</span> ?",
        options: ["Dublin", "Berna", "Ottawa", "Praga"],
        correct: "Dublin"
    },
    {
        question: "Qual a capital da <span>Egito</span> ?",
        options: ["Cidade do Cabo", "Nova Deli", "Cairo", "Luanda"],
        correct: "Cairo"
    },
    {
        question: "Qual a capital do <span>Peru</span> ?",
        options: ["La Paz", "Lima", "Santiago", "Montevidéu"],
        correct: "Lima"
    },
    {
        question: "Qual a capital da <span>Coreia do Sul</span> ?",
        options: ["Pyongyang", "Seoul", "Pequim", "Tóquio"],
        correct: "Seoul"
    },
    {
        question: "Qual a capital de <span>Cuba</span> ?",
        options: ["Quito", "Macau", "Havana", "Daca"],
        correct: "Havana"
    },
    {
        question: "Qual a capital da <span>Indonésia</span> ?",
        options: ["Jacarta", "Abu Dhabi", "Hanói", "Kingston"],
        correct: "Jacarta"
    },
    {
        question: "Qual a capital da <span>Palestina</span> ?",
        options: ["Bacu", "Banjui", "Ramallah", "Jerusalém"],
        correct: "Ramallah"
    },
    {
        question: "Qual a capital da <span>Hungria</span> ?",
        options: ["Bruxelas", "Ancara", "Atenas", "Budapeste"],
        correct: "Budapeste"
    },
    {
        question: "Qual a capital do <span>Irã</span> ?",
        options: ["Taipé", "Saná", "Teerã", "Riade"],
        correct: "Teerã"
    },
    {
        question: "Qual a capital do <span>Bahamas</span> ?",
        options: ["Nairóbi", "Nassau", "Guitega", "Inglaterra"],
        correct: "Nassau"
    },
    {
        question: "Qual a capital da <span>Costa Rica</span> ?",
        options: ["San José", "Quito", "Bogotá", "Astana"],
        correct: "San José"
    },
    {
        question: "Qual a capital da <span>Eitiópia</span> ?",
        options: ["Gaborone", "Beirute", "Adis-Abeba", "Abuja"],
        correct: "Adis-Abeba"
    }
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

        if(i < 2){
            opcoesResposta.appendChild(opcaoResposta);
        } else {
            opcoesResposta2.appendChild(opcaoResposta);
        }
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

    if (questaoAtualMostrada.correct == respostaSelecionada) {
        qtdAcertos++
    } else {
        qtdErros++
    }

    console.log("Acertos " + qtdAcertos);
    console.log("Erros " + qtdErros);
    console.log(questaoAtualMostrada.correct == respostaSelecionada)

    questaoAtual++;
    if (questaoAtual < quizData.length) {
        carregarQuestao();
        numQuestao.innerHTML = `Questão ${questaoAtual + 1} de ${quizData.length}`
    } else {
        fetch(`/usuarios/cadastrarMetricasQuizPais`, {
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
    window.location = "quiz_capital.html";
}

function ir_resultados() {
    window.location = "curiosidade.html#resultados";
}

function sair() {
    window.location = "curiosidade.html"
}
