function cadastrarUsuario() {
    const nome = document.getElementById("nome-adm").value;
    const email = document.getElementById("email-adm").value;
    
    if (nome === "" || email === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const novoUsuario = {
        id: Date.now(), 
        nome: nome,
        email: email,
        data: new Date().toLocaleString()
    };

    let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    
    listaUsuarios.push(novoUsuario);
    
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

    renderizarLista(listaUsuarios);
    limparCampos();
}

function limparCampos() {
    document.getElementById("nome-adm").value = "";
    document.getElementById("email-adm").value = "";
}

function renderizarLista(usuarios) {
    const listaUl = document.getElementById("tabela-usuarios");
    listaUl.innerHTML = ""; 

    //const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];

    usuarios.forEach((usuario) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${usuario.data} - <strong>${usuario.nome}</strong> (${usuario.email})
            <button class="botao-excluir" onclick="excluirItem(${usuario.id})">X</button>
        `;
        listaUl.appendChild(li);
    });
}

function excluirItem(id) {
    if (confirm("Deseja realmente excluir este usuário?")) {
        let usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
        usuarios = usuarios.filter(user => user.id !== id);
        localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
        renderizarLista(usuarios);
    }
}

function excluirTodos() {
    const confirmacao = confirm("Deseja realmente excluir todos os usuários?");
    
    if (confirmacao) {
        localStorage.removeItem('listaUsuarios');
        renderizarLista();
        
        alert("Todos os usuários foram excluídos com sucesso!");
    }
}

function buscarPorCampo() {
    const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    //const listaUsers = document.getElementById("tabela-usuarios");
    //listaUsers.innerHTML = "";

    const filtro = prompt("Digite o filtro desejado (nome ou email):");

    if (filtro!=null && filtro.length!=0) {
        const opcao = filtro.includes("@") ? "email" : "nome";
        let usuariosFiltro;
        usuariosFiltro = usuarios.filter(usuario => (opcao=="email" ? usuario.email : usuario.nome)==filtro);
        return renderizarLista(usuariosFiltro);
    }
    return renderizarLista(usuarios);
}

window.onload = renderizarLista(JSON.parse(localStorage.getItem('listaUsuarios')) || []);