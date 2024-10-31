let size = 3; 
let vector = [];
let moveCount = 0;

let timer;
let timeElapsed = 0; // Armazena o tempo decorrido em segundos
let isTimerRunning = false; // Verifica se o temporizador já está rodando


function countInversions(array) {
    let inversions = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            // Ignora o espaço vazio
            if (array[i] != size * size && array[j] != size * size && array[i] > array[j]) {
                inversions++;
            }
        }
    }
    return inversions;
}

function isSolvable() {
    let inversions = countInversions(vector);
    
    if (size % 2 !== 0) {
        return inversions % 2 === 0; // Se a grid for ímpar
    } else {
        let emptyRow = Math.floor(vector.indexOf(size * size) / size);
        return (inversions % 2 === 0) === (emptyRow % 2 !== 0);
    }
}

function initVector() {
    for (let index = 0; index < size * size; index++) {
        vector[index] = index + 1;
    }
}

function shuffle() {
    let index, counter;
    index = counter = 0;

    do {
        for (let count = vector.length - 1; count > 0; count--) {
            index = Math.floor(Math.random() * (count + 1));
            counter = vector[index];
            vector[index] = vector[count];
            vector[count] = counter;
        }
    } while (!isSolvable());
}

// Gerar o tabuleiro 
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

    // Inicia o temporizador no primeiro toque
    if (!isTimerRunning) {
        startTimer();
        isTimerRunning = true;
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
    updateMoveCountDisplay();

    if (resolvido()) {
        stopTimer();
        document.getElementById('puzzle-solved-modal').style.display = 'block'; // Exibe o modal quando o puzzle é resolvido
    }
}

// Função para verificar se o puzzle está resolvido
function resolvido() {
    for (let index = 0; index < size * size; index++) {
        if (vector[index + 1] < vector[index]) {
            return false;
        }
    }
    return true;
}

    // Evento para reiniciar o jogo ao clicar no botão
document.getElementById('restart-btn').onclick = function () {
    resetGame();
}

// Evento para o botão Reiniciar no modal
document.getElementById('modal-restart-btn').onclick = function() {
    resetGame();
    document.getElementById('puzzle-solved-modal').style.display = 'none'; // Oculta o modal após reiniciar
}

// Contador do Movimentos
function updateMoveCountDisplay() {
    document.getElementById('move-count').innerText = "Toques: " + moveCount;
}

// Temporizador
function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Contador de tempo
function updateTimerDisplay() {
    document.getElementById('timer').innerText = "Tempo: " + timeElapsed + "s";
}

// Seleciona os elementos necessários
const select = document.getElementById("select");
const restartBtn = document.getElementById("restart-btn");
const playBtn = document.getElementById("play");

// Inicializa o botão "Reiniciar" como inabilitado
restartBtn.disabled = true;

// Função para habilitar o botão "Reiniciar" quando "Play" for clicado
playBtn.addEventListener("click", () => {
    restartBtn.disabled = false; // Habilita o botão "Reiniciar"
});

// Função para inabilitar o botão "Reiniciar" quando a opção do select for trocada
select.addEventListener("change", () => {
    restartBtn.disabled = true; // Inabilita o botão "Reiniciar"
});


// Inicializa o jogo
function resetGame() {
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = ''; // Limpa o tabuleiro
    moveCount = 0;
    timeElapsed = 0;
    isTimerRunning = false;
    updateMoveCountDisplay();
    updateTimerDisplay();
    clearInterval(timer); // Para o temporizador

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

// Botão de salvar no modal
document.getElementById("modal-save-btn").addEventListener("click", function() {
    // Pegando o tempo e os movimentos atuais
    const movimentos = parseInt(document.getElementById("move-count").textContent.replace('Toques: ', ''));
    const tempo = document.getElementById("timer").textContent.replace('Tempo: ', '');

    // Função que vai salvar os dados
    terminarJogoClassico(movimentos, tempo);
});