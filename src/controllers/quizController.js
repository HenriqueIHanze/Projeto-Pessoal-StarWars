var quizModel = require("../models/quizModel");

function responder(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var respostas = req.body.respostasServer;

    var respostasValidas = true;

    if (Array.isArray(respostas)) {
        for (var i = 0; i < respostas.length; i++) {
            if (respostas[i] == undefined
                || isNaN(Number(respostas[i].idPergunta))
                || typeof respostas[i].letra != "string"
                || "ABCD".indexOf(respostas[i].letra) == -1
                || respostas[i].letra.length != 1) {
                respostasValidas = false;
            }
        }
    }

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (isNaN(Number(idUsuario))) {
        res.status(400).send("Seu idUsuario é inválido!");
    } else if (respostas == undefined) {
        res.status(400).send("Suas respostas estão undefined!");
    } else if (!Array.isArray(respostas) || respostas.length != 5) {
        res.status(400).send("Envie as respostas das 5 perguntas!");
    } else if (!respostasValidas) {
        res.status(400).send("Suas respostas estão inválidas!");
    } else {

        quizModel.responder(Number(idUsuario), respostas)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao salvar as respostas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    responder
}
