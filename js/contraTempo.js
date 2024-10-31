let size = 3; 
let vector = [];
let moveCount = 0;

let timer;         
let timeElapsed = 0; 
let totalTime = 0; // Tempo total permitido
let isTimerRunning = false;

let winSoundPlayed = false;
let loseSoundPlayed = false;


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
function generateBoard(){

    let table = document.createElement('table');
    let ctr = 0;
    table.id = 'table';

    for(let i = 0; i < size; i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < size; j++){
            let td = document.createElement('td');

            td.innerText = vector[ctr];

            if(vector[ctr]	== size * size){
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
function addEventsToTiles(){
    document.getElementById('table').addEventListener('click', execute, false);

}

// Função chamada quando um azulejo é clicado
function execute(e){
    makeMove(parseInt(e.target.id), e.target.innerText);

}


// Função para mover um azulejo se possível
function makeMove(scrIndex, txt){

    if(txt == (size * size).toString()){
        return;
    }

    if (!isTimerRunning) {
        startTimer();
        isTimerRunning = true;
    }
    
    
    let balckTileText = (size * size).toString();

   
    // Mover para cima 
    if(scrIndex - size >= 0){
        let topTile = document.getElementById((scrIndex -size).toString()).innerText; 
        
        if(topTile == balckTileText){
            console.log('move possible');
            updateBoard(scrIndex, scrIndex - size);
            moveCount++;  // Incrementa o contador de toques
            updateMoveCountDisplay();  // Atualiza a exibição do contador
        }
    }



    // Mover para baixo
    if(scrIndex + size < (size * size) ){
        let bottomTileTxt = document.getElementById((scrIndex + size).toString()).innerText;

        if(bottomTileTxt == balckTileText){
            console.log('move possible');
            updateBoard(scrIndex, scrIndex + size);
            moveCount++;  // Incrementa o contador de toques
            updateMoveCountDisplay();  // Atualiza a exibição do contador
            
        }
        
    }

    if( (scrIndex + 1) % size != 0){

        let rightTileTxt = document.getElementById((scrIndex + 1).toString()).innerText;

        if(rightTileTxt == balckTileText){
            console.log('move possible');
            updateBoard(scrIndex, scrIndex + 1);
            moveCount++;  // Incrementa o contador de toques
            updateMoveCountDisplay();  // Atualiza a exibição do contador
        }

    }

    if(scrIndex % size != 0){
        let leftTileTxt = document.getElementById((scrIndex - 1).toString()).innerText;

        if(leftTileTxt == balckTileText){
            console.log('move possible');
            updateBoard(scrIndex, scrIndex - 1);
            moveCount++;  // Incrementa o contador de toques
            updateMoveCountDisplay();  // Atualiza a exibição do contador
        }
    }

    if(resolvido()){
        endGame(true); 
    }
}

    // Função para atualizar o tabuleiro após um movimento
    function updateBoard(scrIndex, destIndex){
        
        let scrTile = document.getElementById(scrIndex);
        let destTile = document.getElementById(destIndex);
         
        destTile.style.opacity  = '1';
        scrTile.style.opacity = '0';

        let counter = destTile.innerText;


        destTile.innerText = scrTile.innerText;
        scrTile.innerText = counter;


        counter = vector[scrIndex];
        vector[scrIndex] = vector[destIndex];
        vector[destIndex] = counter;


        if(resolvido()){
            console.log('puzzle solved');
            stopTimer();
            PuzzleResolvido();
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

    // Evento para reiniciar o jogo ao clicar no botão
    document.getElementById('restart-btn').onclick = function() {
        console.log("Botão Reiniciar clicado");
        resetGame(); // Reinicia o jogo
    };



    // Contador do Movimentos

    function updateMoveCountDisplay() {
        document.getElementById('move-count').innerText = "Toques: " + moveCount;
    }


    // Temporizador

    // Função para atualizar o tempo na tela
    function startTimer() {
        timer = setInterval(() => {
            timeElapsed++;
            updateTimerDisplay(); 
            
            if (timeElapsed >= totalTime) {
                clearInterval(timer);
                endGame(false); // Tempo esgotado
            }
        }, 1000);
    }
    
 
// Verficar se o jogador ganhou a partida
function endGame(isWin) {
    stopTimer();
    if (isWin) {
        document.getElementById('win-modal').style.display = 'flex'; // Exibe modal de vitória
    } else {
        document.getElementById('lose-modal').style.display = 'flex'; // Exibe modal de derrota
    }
    // Adiciona o evento de reinício
    document.getElementById('lose-modal').querySelector('#restart-btn').onclick = resetGame;
}
    

    // Função para parar o tempo
    function stopTimer() {
        clearInterval(timer);  
    }
    // Função para atualizar o tempo
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

    


    // Função para reiniciar o jogo
    function resetGame() {
    
    // Oculta os modais de vitória e derrota
    document.getElementById('win-modal').style.display = 'none';
    document.getElementById('lose-modal').style.display = 'none';
    
    // Limpa o conteúdo anterior do tabuleiro
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = ''; // Limpa o tabuleiro
    
    // Reinicia as variáveis de controle do jogo
    moveCount = 0;
    timeElapsed = 0;
    updateMoveCountDisplay();
    updateTimerDisplay();
    
    // Reinicia o temporizador
    clearInterval(timer);
    isTimerRunning = false;
    
    // Recria o vetor e o tabuleiro
    initVector();
    shuffle();
    generateBoard();
    addEventsToTiles();
    }


    // Função que você deve criar para fechar os modais
    document.getElementById("win-save-btn").addEventListener("click", function() {
        const movimentos = parseInt(document.getElementById("move-count").innerText.split(": ")[1]);
        const tempo = parseInt(document.getElementById("timer").innerText.split(": ")[1]);
        terminarJogoContraRelogio(movimentos, tempo);
        closeModals(); 
    });
    
    // Função que você deve criar para fechar os modais
    document.getElementById("lose-save-btn").addEventListener("click", function() {
        const movimentos = parseInt(document.getElementById("move-count").innerText.split(": ")[1]);
        const tempo = parseInt(document.getElementById("timer").innerText.split(": ")[1]);
        terminarJogoContraRelogio(movimentos, tempo);
        closeModals(); 
    });
    
    // Função para fechar os modais
    function closeModals() {
        document.getElementById("win-modal").style.display = "none";
        document.getElementById("lose-modal").style.display = "none";
    }

    document.getElementById('play').onclick = function() {
        // Esconde o menu de seleção
        document.getElementById('menu-container').style.display = 'none';
        
        // Limpa o conteúdo anterior do tabuleiro (caso já exista um)
        const boardContainer = document.getElementById('board-container');
        boardContainer.innerHTML = ''; // Limpa o tabuleiro anterior
        
        // Define o tamanho do jogo e o tempo total baseado na dificuldade
        size = parseInt(document.getElementById('select').value);
        
        if (size == 3) totalTime = 300; // Fácil - 5 minutos
        else if (size == 4) totalTime = 600; // Médio - 10 minutos
        else totalTime = 1200; // Difícil - 20 minutos
        
        // Reinicia as variáveis e o estado do jogo
        initVector();
        shuffle();
        generateBoard();
        addEventsToTiles(); 
    };
    
