var database = require("../database/config");

function buscarResumo(idUsuario) {

    var instrucaoSql = `SELECT
                        (SELECT COUNT(DISTINCT fk_usuario) FROM resposta_quiz) AS participantes,
                        (SELECT IFNULL(ROUND(SUM(r.letra_escolhida = p.alternativa_correta) / COUNT(DISTINCT r.fk_usuario), 1), 0)
                            FROM resposta_quiz r
                                JOIN pergunta p ON p.id = r.fk_pergunta) AS media_acertos,
                        (SELECT COUNT(*)
                            FROM resposta_quiz r
                                JOIN pergunta p ON p.id = r.fk_pergunta
                            WHERE r.fk_usuario = ${idUsuario}
                            AND r.letra_escolhida = p.alternativa_correta) AS seus_acertos`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAcertosPorPergunta(idUsuario) {

    var instrucaoSql = `SELECT
                        p.id AS id_pergunta,
                        p.resumo,
                        p.categoria,
                        IFNULL(ROUND(SUM(r.letra_escolhida = p.alternativa_correta) / COUNT(r.fk_usuario) * 100), 0) AS percentual,
                        (SELECT r2.letra_escolhida = p.alternativa_correta
                            FROM resposta_quiz r2
                            WHERE r2.fk_usuario = ${idUsuario}
                            AND r2.fk_pergunta = p.id) AS voce_acertou
                    FROM pergunta p
                        LEFT JOIN resposta_quiz r ON r.fk_pergunta = p.id
                    GROUP BY p.id, p.resumo, p.categoria, p.alternativa_correta
                    ORDER BY p.id`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAnakinVsVader(idUsuario) {

    var instrucaoSql = `SELECT
                        p.categoria,
                        COUNT(DISTINCT p.id) AS total_perguntas,
                        IFNULL(ROUND(SUM(r.letra_escolhida = p.alternativa_correta) / COUNT(r.fk_usuario) * 100), 0) AS percentual,
                        (SELECT COUNT(*)
                            FROM resposta_quiz r2
                                JOIN pergunta p2 ON p2.id = r2.fk_pergunta
                            WHERE r2.fk_usuario = ${idUsuario}
                            AND p2.categoria = p.categoria
                            AND r2.letra_escolhida = p2.alternativa_correta) AS seus_acertos
                    FROM pergunta p
                        LEFT JOIN resposta_quiz r ON r.fk_pergunta = p.id
                    GROUP BY p.categoria
                    ORDER BY p.categoria`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarResumo,
    buscarAcertosPorPergunta,
    buscarAnakinVsVader
}
