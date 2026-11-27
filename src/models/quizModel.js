var database = require("../database/config");

function responder(idUsuario, respostas) {

    // monta uma linha de VALUES para cada resposta: (usuário, pergunta, letra)
    var valores = "";

    for (var i = 0; i < respostas.length; i++) {
        if (i > 0) {
            valores += ", ";
        }
        valores += `(${idUsuario}, ${respostas[i].idPergunta}, '${respostas[i].letra}')`;
    }

    // se o usuário refizer o quiz, a resposta antiga da mesma pergunta é substituída
    var instrucaoSql = `
        INSERT INTO resposta_quiz (fk_usuario, fk_pergunta, letra_escolhida) VALUES ${valores}
        ON DUPLICATE KEY UPDATE letra_escolhida = VALUES(letra_escolhida);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    responder
}
