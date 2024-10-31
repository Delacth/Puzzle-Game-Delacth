// Função para criar um novo jogador
function criarJogador(nome, senha) {
    let jogadores = JSON.parse(localStorage.getItem("jogador")) || { jogador: [] };

    const jogadorExistente = jogadores.jogador.find(jogador => jogador.nome === nome);
    if (jogadorExistente) {
        alert("Jogador já existe!");
        return false;
    }

    jogadores.jogador.push({ 
        nome: nome, 
        senha: senha, 
        classico: { movimentos: 0, tempo: 0 },
        cRelogio: { movimentos: 0, tempo: 0 }
    });

    localStorage.setItem("jogador", JSON.stringify(jogadores));
    alert("Jogador criado com sucesso!");
    return true;
}

// Função para autenticar um jogador
function autenticarJogador(nome, senha) {
    let jogadores = JSON.parse(localStorage.getItem("jogador")) || { jogador: [] };
    const jogador = jogadores.jogador.find(jogador => jogador.nome === nome && jogador.senha === senha);
    if (jogador) {
        localStorage.setItem("usuarioLogado", JSON.stringify(jogador)); // Salva o jogador logado
        window.location.href = 'telapricipal.html'; // Redireciona para a tela do jogo
        return true;
    } else {
        alert("Nome de jogador ou senha incorretos.");
        return false;
    }
}

// Verifica se o usuário está logado
function verificarLogin() {
    setInterval(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
        window.location.href = 'login.html'; 
    }
}, 30000); 
}

// Função para verificar login periodicamente
function verificarLoginPeriodicamente() {
    setInterval(() => {
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (!usuarioLogado) {
            alert("Sua sessão expirou. Você será redirecionado para a página de login.");
            window.location.href = 'login.html'; 
        }
    }, 300000); 
}

// Adicionando eventos de formulário
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = document.getElementById("name").value;
    const senha = document.getElementById("password").value; 
    autenticarJogador(nome, senha);
});

document.getElementById("criarContaForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = document.getElementById("name").value; 
    const senha = document.getElementById("password").value; 
    if (criarJogador(nome, senha)) {
        alert("Conta criada com sucesso! Você pode fazer login agora.");
        window.location.href = 'login.html'; 
    }
});

// Função para sair da sessão
function sair() {
    localStorage.removeItem("usuarioLogado"); // Remove o usuário logado
}

// Adicionando evento ao botão "Sair"
document.getElementById("sairButton")?.addEventListener("click", function() {
    sair(); // Chama a função para sair
    window.location.href = "login.html"; // Redireciona para a página de login
});

// Função para salvar dados do modo clássico e contra relógio (movimentos e tempo)
function salvarDados(movimentos, tempo, modo) {
    let jogadorLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (jogadorLogado) {
        // Atualiza os dados do modo apropriado
        if (modo === 'classico') {
            jogadorLogado.classico.movimentos = movimentos;
            jogadorLogado.classico.tempo = tempo;
        } else if (modo === 'contraRelogio') {
            jogadorLogado.cRelogio.movimentos = movimentos;
            jogadorLogado.cRelogio.tempo = tempo;
        }

        // Atualiza o localStorage com os dados do jogador
        let jogadores = JSON.parse(localStorage.getItem("jogador"));
        const index = jogadores.jogador.findIndex(j => j.nome === jogadorLogado.nome);

        if (index !== -1) {
            jogadores.jogador[index] = jogadorLogado; // Atualiza os dados do jogador no array
            localStorage.setItem("jogador", JSON.stringify(jogadores));
            localStorage.setItem("usuarioLogado", JSON.stringify(jogadorLogado)); 

            alert(`Dados salvos!\nNome: ${jogadorLogado.nome}\nMovimentos: ${movimentos}\nTempo: ${tempo} segundos`);
        }
    } else {
        alert("Nenhum jogador logado!");
    }
}

// Função chamada ao terminar o jogo no modo clássico
function terminarJogoClassico(movimentos, tempo) {
    salvarDados(movimentos, tempo, 'classico');
    atualizarTabelaClassificacao();
    alert("Jogo Clássico terminado!");
}

// Função chamada ao terminar o jogo no modo contra relógio
function terminarJogoContraRelogio(movimentos, tempo) {
    salvarDados(movimentos, tempo, 'contraRelogio');
    alert("Jogo Contra Relógio terminado!");
}


// Chama a verificação de login na página do jogo
verificarLogin();
verificarLoginPeriodicamente(); // Inicia a verificação periódica
atualizarTabelaClassificacao();