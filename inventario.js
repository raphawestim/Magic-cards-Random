// Carrega as cartas salvas da localStorage
let cartasSalvas = JSON.parse(localStorage.getItem('cartasSalvas'));

// Obtém o elemento <ul> para exibir as cartas
let listaCartas = document.getElementById('cartas-salvas');

// Exibe as cartas na lista, se houver dados salvos
if (cartasSalvas !== null) {
  cartasSalvas.forEach(carta => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = carta.imageUrl;
    li.appendChild(img);
    listaCartas.appendChild(li);
  });
} else {
  // Exibe uma mensagem para o usuário se não houver dados salvos
  let li = document.createElement('li');
  li.textContent = "Não há cartas salvas.";
  listaCartas.appendChild(li);
}