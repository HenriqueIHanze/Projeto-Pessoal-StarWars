var quizModel = require("../models/quizModel");

function responder(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var respostas = req.body.respostasServer;

    if (idUsuario == undefined || isNaN(Number(idUsuario))) {
        res.status(400).send("Seu idUsuario está inválido!");
    } else if (respostas == undefined || respostas.length != 5) {
        res.status(400).send("Envie as respostas das 5 perguntas!");
    } else {

        // confere as 5 respostas: o id da pergunta precisa ser número e a letra precisa ser A, B, C ou D
        for (var i = 0; i < respostas.length; i++) {
            if (isNaN(Number(respostas[i].idPergunta)) || "ABCD".indexOf(respostas[i].letra) == -1) {
                res.status(400).send("Suas respostas estão inválidas!");
                return;
            }
        }

        quizModel.responder(idUsuario, respostas)
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
