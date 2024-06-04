var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
    SELECT idUsuario, nome, TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) AS idade, genero, email, regiao, senha  FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(usuario, dataNasc, email, senha, regiao, genero) {

    var instrucaoSql = `
        INSERT INTO Usuario (nome, dtNasc, genero, email, regiao, senha) VALUES ('${usuario}', '${dataNasc}', '${genero}', '${email}', '${regiao}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarMetricasQuizBandeira(idUsuario, qtdAcertos, qtdErros) {

    var instrucaoSql = `
        INSERT INTO Metricas (qtdAcertos, qtdErros, dtTentativa, fkQuiz, fkUsuario) VALUES (${qtdAcertos}, ${qtdErros}, now(), 1, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function capturarMetricas(idUsuario) {
    var instrucaoSql = `
    SELECT qtdAcertos, qtdErros, dtTentativa FROM Metricas WHERE fkUsuario = ${idUsuario} ORDER BY dtTentativa;`;

    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarMetricasQuizBandeira,
    capturarMetricas
};