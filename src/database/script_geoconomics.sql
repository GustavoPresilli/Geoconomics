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

INSERT INTO Quiz VALUES (DEFAULT, 'Quiz de Bandeiras', 'Quiz aparecendo uma bandeira e quatro opções de seleção');