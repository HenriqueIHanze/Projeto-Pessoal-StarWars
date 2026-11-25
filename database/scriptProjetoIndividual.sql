CREATE DATABASE anakin_vader;

USE anakin_vader;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(50)
);

CREATE TABLE pergunta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enunciado VARCHAR(150),
    resumo VARCHAR(50),
    categoria VARCHAR(15),
    alternativa_correta CHAR(1)
);

/* uma resposta por usuário em cada pergunta: ao refazer o quiz, a resposta antiga é substituída */

CREATE TABLE resposta_quiz (
    fk_usuario INT,
    fk_pergunta INT,
    letra_escolhida CHAR(1),
    PRIMARY KEY (fk_usuario, fk_pergunta),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (fk_pergunta) REFERENCES pergunta(id)
);

/* a ordem abaixo é a mesma das perguntas em public/dashboard/quiz.html (ids de 1 a 5) */

INSERT INTO pergunta (enunciado, resumo, categoria, alternativa_correta) VALUES
('O que diz a profecia Jedi sobre Anakin?', 'Profecia do Escolhido', 'Anakin', 'B'),
('Contra quem Anakin perde o braço direito em Ataque dos Clones?', 'Quem cortou o braço de Anakin', 'Anakin', 'C'),
('Em que filme Vader revela a Luke que é seu pai?', 'Quando Vader revela ser pai', 'Darth Vader', 'B'),
('O que faz Vader se voltar contra o Imperador em O Retorno de Jedi?', 'Por que Vader trai o Imperador', 'Darth Vader', 'D'),
('Quem são os filhos de Darth Vader?', 'Os filhos de Vader', 'Darth Vader', 'C');
