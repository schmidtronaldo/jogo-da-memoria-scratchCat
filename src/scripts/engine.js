
//musica de fundo
let bgMusic = document.querySelector('audio');
bgMusic.volume = 0.3;
bgMusic.play();

//efeitos sonoros
let corvo = new Audio('./src/audio/corvo.mp3');
let error = new Audio('./src/audio/error.mp3');
let success = new Audio('./src/audio/success.mp3');
success.volume = 0.3;

//cartas com personagens
const atores =[
  'cat',
  'giga',
  'gobo',
  'nano',
  'penguin',
  'pico',
  'pony',
  'tera',
  'unicorn'
];
//duplica lista de atores
const embaralharAtores = [... atores , ...atores];
//embaralha ordem dos personagens
const cartas = embaralharAtores.sort(()=> Math.random() - 0.5);
//salva cartas clicadas
let openCards = [];
//adiciona as cartas dinamicamente no html
for (let i = 0; i < cartas.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.style.backgroundImage = `url('./src/img/${cartas[i]}.svg')`;
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

//verifica quantidade de cartas abertas
function handleClick() {
  
  
//corrige bug  clicar duas vezes mesma carta 
  if (openCards.length < 2 && this.classList.length<2) {
    this.classList.add("boxOpen");
    openCards.push(this);
    corvo.play();
    
    
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }
}

//verifica se cartas tem mesmo valor
function checkMatch() {
  
  if (openCards[0].outerHTML === openCards[1].outerHTML) {
    success.play();
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    error.play();
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
    
  }
  openCards = [];
 
 // verifica condiçao de vitoria
  if (document.querySelectorAll(".boxMatch").length === cartas.length) {
    let textoVitoria = document.querySelector('.titulo');
    textoVitoria.innerHTML = "Você venceu! Parabéns!";
  }
}


