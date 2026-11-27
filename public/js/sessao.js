// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var nomeUsuario = document.getElementById("nomeUsuario");
    var avatarUsuario = document.getElementById("avatarUsuario");

    if (email != null && nome != null) {
        nomeUsuario.textContent = "Olá, " + nome;
        avatarUsuario.textContent = nome.charAt(0).toUpperCase();
    } else {
        window.location = "../dashboard/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../site/inicio.html";
}
