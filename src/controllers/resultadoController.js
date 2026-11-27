var resultadoModel = require("../models/resultadoModel");

function buscarResumo(req, res) {

    var idUsuario = req.params.idUsuario;

    if (isNaN(Number(idUsuario))) {
        res.status(400).send("Seu idUsuario é inválido!");
        return;
    }

    console.log(`Recuperando o resumo da dashboard`);

    resultadoModel.buscarResumo(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o resumo da dashboard.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAcertosPorPergunta(req, res) {

    var idUsuario = req.params.idUsuario;

    if (isNaN(Number(idUsuario))) {
        res.status(400).send("Seu idUsuario é inválido!");
        return;
    }

    console.log(`Recuperando os acertos por pergunta`);

    resultadoModel.buscarAcertosPorPergunta(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os acertos por pergunta.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAnakinVsVader(req, res) {

    var idUsuario = req.params.idUsuario;

    if (isNaN(Number(idUsuario))) {
        res.status(400).send("Seu idUsuario é inválido!");
        return;
    }

    console.log(`Recuperando Anakin vs. Darth Vader`);

    resultadoModel.buscarAnakinVsVader(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar Anakin vs. Darth Vader.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarResumo,
    buscarAcertosPorPergunta,
    buscarAnakinVsVader
}
