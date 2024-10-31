// Função para alterar a cor de fundo e salvar no localStorage
function alterarCorFundo(cor) {
  localStorage.setItem('corFundo', cor);
  aplicarCorFundo();
}

// Função para aplicar a cor de fundo em todos os arquivos que chamam o JavaScript
function aplicarCorFundo() {
  // Define a cor de fundo padrão como azul
  const corFundo = localStorage.getItem('corFundo') || '#87CEEB'; // Azul claro como padrão
  const elementoTabuleiro = document.getElementById('tabuleiro');
  
  if (elementoTabuleiro) {
      elementoTabuleiro.style.backgroundColor = corFundo;
  } else {
      // Aplica ao body caso o elemento 'tabuleiro' não exista
      document.body.style.backgroundColor = corFundo;
  }
}



aplicarCorFundo();