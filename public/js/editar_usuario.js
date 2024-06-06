var idUsuario = sessionStorage.ID_USUARIO;


function capturarDadosUsuario() {
    fetch(`/usuarios/capturarDadosUsuario/${idUsuario}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((dadosUsuario) => {
                var dataAtual = new Date(dadosUsuario[0].dtNasc)
                var ano = dataAtual.getFullYear();
                var dia = dataAtual.getDate();
                var mes = dataAtual.getMonth() + 1;

                if (mes < 10) {
                    input_dataNascimento.value = `${ano}-0${mes}-${dia}`;
                } else if (dia < 10) {
                    input_dataNascimento.value = `${ano}-${mes}-0${dia}`;
                } else if (dia < 10 && mes < 10) {
                    input_dataNascimento.value = `${ano}-0${mes}-0${dia}`;
                } else {
                    input_dataNascimento.value = `${ano}-${mes}-${dia}`;
                }
                
                input_usuario.value = dadosUsuario[0].nome;
                select_genero.value = dadosUsuario[0].genero;
                input_email.value = dadosUsuario[0].email;
                select_regiao.value = dadosUsuario[0].regiao;
                input_senha.value = dadosUsuario[0].senha;
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function retornar() {
    window.location = "curiosidade.html"
}

function editar() {
    input_dataNascimento.disabled = false;
    input_usuario.disabled = false;
    input_email.disabled = false;
    input_senha.disabled = false;
    select_genero.disabled = false;
    select_regiao.disabled = false;
    input_urlImagem.disabled = false;

    btn_paginaEditar.innerHTML = "Salvar Alterações"
    btn_paginaEditar.onclick = salvar;
}

function salvar() {
    var nome = input_usuario.value;
    var dtNasc = input_dataNascimento.value;
    var email = input_email.value;
    var senha = input_senha.value;
    var urlImagem = input_urlImagem.value
    var genero = select_genero.value;
    var regiao = select_regiao.value;

    fetch(`/usuarios/editarDadosUsuario/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            dtNascServer: dtNasc,
            emailServer: email,
            senhaServer: senha,
            urlImagemServer: urlImagem,
            generoServer: genero,
            regiaoServer: regiao
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            alert("Dados Editados!")
            sessionStorage.NOME_USUARIO = nome;
            // sessionStorage.IDADE_USUARIO = idade;
            sessionStorage.REGIAO_USUARIO = regiao;
            sessionStorage.GENERO_USUARIO = genero;
            sessionStorage.EMAIL_USUARIO = email;

        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });


    input_dataNascimento.disabled = true;
    input_usuario.disabled = true;
    input_email.disabled = true;
    input_senha.disabled = true;
    select_genero.disabled = true;
    select_regiao.disabled = true;

    btn_paginaEditar.innerHTML = "Editar Perfil";
    btn_paginaEditar.onclick = editar;
}