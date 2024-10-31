 // Função para carregar os dados do modo clássico e preencher a tabela
function carregarDadosClassico() {
    const jogadores = JSON.parse(localStorage.getItem("jogador"))?.jogador || [];
    const classicoBody = document.getElementById('classico-body');

    // Filtra jogadores com movimentos != 0 e classifica
    const jogadoresClassificados = jogadores
        .filter(jogador => jogador.classico.movimentos > 0) // Filtra jogadores que jogaram
        .sort((a, b) => a.classico.movimentos - b.classico.movimentos); // Ordena por movimentos

    // Limpa a tabela antes de preenchê-la
    classicoBody.innerHTML = '';

    jogadoresClassificados.forEach((jogador, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${jogador.nome}</td>
            <td>${jogador.classico.movimentos}</td>
            <td>${jogador.classico.tempo}</td>
        `;
        classicoBody.appendChild(tr);
    });
}

// Função para carregar os dados do modo Contra-Relógio e preencher a tabela
function carregarDadosCRelogio() {
    const jogadores = JSON.parse(localStorage.getItem("jogador"))?.jogador || [];
    const crelogioBody = document.getElementById('crelogio-body');

    // Filtra jogadores com tempo > 0 e classifica
    const jogadoresClassificados = jogadores
        .filter(jogador => jogador.cRelogio.tempo > 0) 
        .sort((a, b) => a.cRelogio.tempo - b.cRelogio.tempo); 

    // Limpa a tabela antes de preenchê-la
    crelogioBody.innerHTML = '';

    jogadoresClassificados.forEach((jogador, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${jogador.nome}</td>
            <td>${jogador.cRelogio.tempo}</td>
            
        `;
        crelogioBody.appendChild(tr);
    });
}

function atualizarTabelaClassificacao() {
    const jogadores = JSON.parse(localStorage.getItem("jogador"))?.jogador || [];
    const tbody = document.querySelector("#classificacao tbody");
    
    // Limpa a tabela antes de preenchê-la
    tbody.innerHTML = '';

    // Filtra jogadores com movimentos != 0 e classifica
    const jogadoresClassificados = jogadores
        .filter(jogador => jogador.classico.movimentos > 0) // Filtra jogadores que jogaram
        .sort((a, b) => a.classico.movimentos - b.classico.movimentos); // Ordena por movimentos

    jogadoresClassificados.forEach(jogador => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${jogador.nome}</td>
            <td>${jogador.classico.movimentos}</td>
            <td>${jogador.classico.tempo}s</td>

        `;
        tbody.appendChild(row);
    });
}

// Chama a função para carregar os dados ao carregar a página
window.onload = function() {
    carregarDadosClassico();
    carregarDadosCRelogio();
};