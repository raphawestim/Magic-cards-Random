const botao = document.getElementById('botao');
const botaoSalvar = document.getElementById('botaoSalvar');
const imagemPadrao = 'https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg';
const slideContainer =  document.querySelector(".swiper")
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js'



botao.addEventListener('click',atualizarDados)
botaoSalvar.addEventListener('click', salvarInventario);

let arrayCartas = []
let cartasSalvas = [];

async function atualizarDados() {
  await fetchCartas();
  montarSlider();
}

async function fetchCartas(){
  const response = await fetch("https://api.magicthegathering.io/v1/cards?random=true&pageSize=20&minRarity=Mythic")
  const data = await response.json();
  arrayCartas = data.cards;
}

function montarSlider(){
  slideContainer.innerHTML = '';
  const slideWrapper = document.createElement("div");
  const slideNextBtn = document.createElement("div");
  const slidePrevBtn = document.createElement("div");
  const slidePagination = document.createElement("div");

  slideWrapper.classList.add("swiper-wrapper");
  slideNextBtn.classList.add("swiper-button-next");
  slidePrevBtn.classList.add("swiper-button-prev");
  slidePagination.classList.add("swiper-pagination");

  arrayCartas.map(carta =>{
    const slideItem = document.createElement("div");
    slideItem.classList.add("swiper-slide");
    const nomeCarta = document.createElement('h2');
    const imagemCarta = document.createElement('img');

    
    nomeCarta.textContent = carta.name

    if (!carta.imageUrl) {
      imagemCarta.src = imagemPadrao;
   } else {
     imagemCarta.src = carta.imageUrl;
   }

    slideItem.append(imagemCarta);
    slideWrapper.append(slideItem);
    slideContainer.append(slideWrapper);

  })

  const swiper = new Swiper('.swiper', {
    effect: "cards",
    grabCursor: true,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  });

   cartasSalvas = cartasSalvas.concat(arrayCartas); // Adiciona as novas cartas à array de cartas salvas
}

function salvarInventario() {
  // Cria um novo objeto contendo as cartas salvas
  const inventario = {
    data: new Date(),
    cartas: cartasSalvas
  };
  
  // Converte o objeto para JSON e salva em um arquivo ou em um banco de dados, por exemplo
  const json = JSON.stringify(inventario);
  console.log(json);
  
  // Limpa a array de cartas salvas para a próxima atualização do inventário
  cartasSalvas = [];

  console.log("salvou!")

  // Salva as cartas na localStorage
  localStorage.setItem('cartasSalvas', JSON.stringify(arrayCartas));
}



await fetchCartas();
montarSlider();



//console.log(arrayCartas);