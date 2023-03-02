const botao = document.getElementById('botao');
const lista = document.getElementById('cartas');
const imagemPadrao = 'https://via.placeholder.com/223x310.png?text=Imagem+indispon%C3%ADvel';

botao.addEventListener('click', obterCartas);

function obterCartas() {
  fetch('https://api.magicthegathering.io/v1/cards?random=true&pageSize=5&minRarity=RARE')
    .then(response => response.json())
    .then(data => {
      lista.innerHTML = '';
      const cartas = data.cards;
      for (let i = 0; i < cartas.length; i++) {
        const carta = cartas[i];
        const nome = carta.name;
        const imagem = carta.imageUrl;
        const itemLista = document.createElement('li');
        const nomeCarta = document.createElement('h2');
        const imagemCarta = document.createElement('img');
        nomeCarta.textContent = nome;
        if (imagem === undefined) {
          imagem = imagemPadrao; // Substitui por imagem padrão
           //continue; // Ignora cartas sem imagem
        } else {
          imagemCarta.src = imagem;
        }
        itemLista.appendChild(nomeCarta);
        itemLista.appendChild(imagemCarta);
        lista.appendChild(itemLista);
      }
    })
    .catch(error => {
      console.error(error);
    });
}