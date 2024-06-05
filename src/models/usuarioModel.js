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

function cadastrarMetricasQuizPais(idUsuario, qtdAcertos, qtdErros) {

    var instrucaoSql = `
        INSERT INTO Metricas (qtdAcertos, qtdErros, dtTentativa, fkQuiz, fkUsuario) VALUES (${qtdAcertos}, ${qtdErros}, now(), 2, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function capturarMetricasBandeira(idUsuario) {
    var instrucaoSql = `
    SELECT qtdAcertos, qtdErros, dtTentativa FROM Metricas WHERE fkUsuario = ${idUsuario} AND fkQuiz = 1 ORDER BY dtTentativa DESC LIMIT 5;`;

    return database.executar(instrucaoSql);
}

function capturarMetricasCapital(idUsuario) {
    var instrucaoSql = `
    SELECT qtdAcertos, qtdErros, dtTentativa FROM Metricas WHERE fkUsuario = ${idUsuario} AND fkQuiz = 2 ORDER BY dtTentativa DESC LIMIT 5;`;

    return database.executar(instrucaoSql);
}

function capturarPorcAcertos(idUsuario) {
    var instrucaoSql = `
    
    SELECT SUM(qtdAcertos) + SUM(qtdErros) AS total , SUM(qtdAcertos) AS qtdAcertosTotais, (SUM(qtdAcertos)/  (SUM(qtdAcertos) + SUM(qtdErros))) * 100 AS porcentagem FROM Metricas WHERE fkUsuario = ${idUsuario} ORDER BY dtTentativa DESC LIMIT 10;`;

    return database.executar(instrucaoSql);
}

function quantidadeFaixaEtaria() {
    var instrucaoSql =
        `SELECT TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) AS idade FROM Usuario;`
    return database.executar(instrucaoSql);
}

function quantidadeRegiao() {
    var instrucaoSql =
        `SELECT regiao, COUNT(idUsuario) AS quantidade
        FROM Usuario
        GROUP BY regiao;
        `;

    return database.executar(instrucaoSql);
}

function quantidadeGenero() {
    var instrucaoSql =
        `SELECT genero FROM Usuario`;

    return database.executar(instrucaoSql);
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
    quantidadeGenero
};