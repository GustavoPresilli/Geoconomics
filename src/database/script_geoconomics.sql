DROP DATABASE IF EXISTS Geoconomics;
CREATE DATABASE Geoconomics;

USE Geoconomics;

CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    dtNasc DATE NOT NULL,
    genero VARCHAR(60) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    regiao VARCHAR(80) NOT NULL,
    senha VARCHAR(60) NOT NULL
);

CREATE TABLE Quiz (
    idQuiz INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE Metricas (
    idMetricas INT AUTO_INCREMENT PRIMARY KEY,
    qtdAcertos INT NOT NULL,
    qtdErros INT NOT NULL,
    dtTentativa DATETIME NOT NULL,
    fkQuiz INT,
    fkUsuario INT,
    FOREIGN KEY (fkQuiz) REFERENCES Quiz(idQuiz),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

INSERT INTO Quiz VALUES (DEFAULT, 'Quiz de Bandeiras', 'Quiz aparecendo uma bandeira e quatro opções de seleção'),
						(DEFAULT, 'Quiz de Capitais', 'Quiz aparecendo uma capital e quatro opções de seleção');

CREATE VIEW faixaEtaria AS
SELECT '15-29' AS faixa, COUNT(idUsuario) AS quantidade
FROM Usuario 
WHERE TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) >= 15 AND TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) < 30
UNION ALL
SELECT '30-44' AS faixa, COUNT(idUsuario) AS quantidade
FROM Usuario 
WHERE TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) >= 30 AND TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) < 45
UNION ALL
SELECT '45-60' AS faixa, COUNT(idUsuario) AS quantidade
FROM Usuario 
WHERE TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) >= 45 AND TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) <= 60;

SELECT * FROM faixaEtaria;
