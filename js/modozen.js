let size = 3; 
let vector = [];
let moveCount = 0;

// Função para inicializar o vetor com valores de 1 até size * size
function initVector(){
    for (let index = 0; index < size * size; index++) {
        vector[index] = index + 1;
        
    }
}

// Função para verificar se a configuração é resolvível
// Conta o número de inversões e verifica se é par
function isSolvable(vector) {
    let inversions = 0;
    for (let i = 0; i < vector.length; i++) {
        for (let j = i + 1; j < vector.length; j++) {
            if (vector[i] > vector[j] && vector[i] != size * size && vector[j] != size * size) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0; // O número de inversões deve ser par
}

// Função para embaralhar o vetor de forma que a configuração seja resolvível
function shuffle(){
    let index, counter;

    index = counter = 0;

    do {
        for(let count = vector.length - 1; count > 0; count--){
            index = Math.floor(Math.random() * (count + 1));
            counter = vector[index];
            vector[index] = vector[count];
            vector[count] = counter;
        }
    } while (!isSolvable(vector)); // Continue embaralhando até que a configuração seja resolvível
}

// Função para gerar o tabuleiro com base no vetor
function generateBoard() {
    let table = document.createElement('table');
    let ctr = 0;
    table.id = 'table';

    for (let i = 0; i < size; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            let td = document.createElement('td');
            td.innerText = vector[ctr];

            if (vector[ctr] == size * size) {
                td.style.opacity = '0';
            }
            td.id = ctr;
            ctr++;
            tr.append(td);
        }
        table.append(tr);
    }
    document.getElementById('board-container').append(table);
}

// Função para adicionar eventos de clique nos azulejos do tabuleiro
function addEventsToTiles() {
    document.getElementById('table').addEventListener('click', execute, false);
}
// Função chamada quando um azulejo é clicado
function execute(e) {
    makeMove(parseInt(e.target.id), e.target.innerText);
}

// Função para mover um azulejo se possível
function makeMove(scrIndex, txt) {
    if (txt == (size * size).toString()) {
        return;
    }

    let balckTileText = (size * size).toString();

    // Lógica de movimentação
    if (scrIndex - size >= 0) {
        let topTile = document.getElementById((scrIndex - size).toString()).innerText;
        if (topTile == balckTileText) {
            updateBoard(scrIndex, scrIndex - size);
        }
    }
    if (scrIndex + size < (size * size)) {
        let bottomTileTxt = document.getElementById((scrIndex + size).toString()).innerText;
        if (bottomTileTxt == balckTileText) {
            updateBoard(scrIndex, scrIndex + size);
        }
    }
    if ((scrIndex + 1) % size != 0) {
        let rightTileTxt = document.getElementById((scrIndex + 1).toString()).innerText;
        if (rightTileTxt == balckTileText) {
            updateBoard(scrIndex, scrIndex + 1);
        }
    }
    if (scrIndex % size != 0) {
        let leftTileTxt = document.getElementById((scrIndex - 1).toString()).innerText;
        if (leftTileTxt == balckTileText) {
            updateBoard(scrIndex, scrIndex - 1);
        }
    }
}

// Função para atualizar o tabuleiro após um movimento
function updateBoard(scrIndex, destIndex) {
    let scrTile = document.getElementById(scrIndex);
    let destTile = document.getElementById(destIndex);
    
    destTile.style.opacity = '1';
    scrTile.style.opacity = '0';

    let counter = destTile.innerText;
    destTile.innerText = scrTile.innerText;
    scrTile.innerText = counter;

    counter = vector[scrIndex];
    vector[scrIndex] = vector[destIndex];
    vector[destIndex] = counter;

    moveCount++;

    if (resolvido()) {
        document.getElementById('puzzle-solved-modal').style.display = 'block'; // Exibe o modal quando o puzzle é resolvido
    }
}

 // Função chamada quando o puzzle é resolvido
 function PuzzleResolvido(){
    stopTimer();
    document.getElementById('win-modal').style.display = 'flex'; // Exibe modal de vitória
    // Adiciona o evento de reinício
    document.getElementById('win-modal').querySelector('#restart-btn').onclick = resetGame;
}

// Função para verificar se o puzzle está resolvido
function resolvido() {
    for (let index = 0; index < size * size; index++) {
       if(vector[index + 1] < vector[index]){
        return false;
       }
    }

    return true;
}

// Evento para o botão Reiniciar na navbar
document.getElementById('restart-btn').onclick = function () {
    resetGame();
}

// Evento para o botão Reiniciar no modal
document.getElementById('modal-restart-btn').onclick = function() {
    resetGame();
    document.getElementById('puzzle-solved-modal').style.display = 'none'; // Oculta o modal após reiniciar
}

// Resetar o jogo
function resetGame() {

    
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = ''; // Limpa o tabuleiro
    moveCount = 0; 
    size = parseInt(document.getElementById('select').value);
    initVector();
    shuffle();
    generateBoard();
    addEventsToTiles(); // Reatribui o evento de clique
}

// Evento para o botão Play
document.getElementById('play').onclick = function () {
    resetGame();
    document.getElementById('board-container').style.display = 'block';
}

// Adiciona evento para fechar o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('puzzle-solved-modal');
    if (event.target === modal) {
        modal.style.display = 'none'; // Oculta o modal
    }
}
