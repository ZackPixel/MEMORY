const cards = document.querySelectorAll(".flip-card");
const container = document.querySelector(".container");
const cardsArray = Array.from(cards);
const shuffled = cardsArray.sort(() => Math.random() - 0.5);
shuffled.forEach((card) => container.appendChild(card));

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let punti1 = 0;
let punti2 = 0;

const puntiEl1 = document.getElementById("valore-punti1");
const puntiEl2 = document.getElementById("valore-punti2");
const player1El = document.getElementById("player1");
const player2El = document.getElementById("player2");

document.querySelector(".container").classList.remove("show");
document
  .querySelectorAll(".punti")
  .forEach((el) => el.classList.remove("show"));

document.getElementById("giocatore").innerHTML = "Player 1 choose a name";

let player1Inserito = false;
let nome1 = "";
let nome2 = "";
let turno = 1;

function invio() {
  const input = document.querySelector("#name");
  const nome = input.value.trim();
  const inserire = document.querySelector(".inserire");
  const inserire2 = document.querySelector(".inserire2");
  const button = document.querySelector("#lol");
  const player = document.querySelector("#giocatore");
  const container2 = document.querySelector("#container2");

  if (!player1Inserito) {
    if (nome === "") {
      if (inserire)
        document.getElementById("inserire").innerHTML = "Insert a name!";
      return;
    } else {
      nome1 = nome;
      player1El.textContent = nome1;
      document.getElementById("giocatore").innerHTML = "Player 2 choose a name";
      player1Inserito = true;
      input.value = "";
      if (inserire) inserire.remove();
      return;
    }
  }

  if (nome === "") {
    document.getElementById("inserire2").innerHTML = "Insert a name!";
    return;
  } else {
    nome2 = nome;
    player2El.textContent = nome2;

    input.remove();
    button.remove();
    player.remove();
    container2.remove();
    if (inserire2) inserire2.remove();

    document
      .querySelectorAll(".punti")
      .forEach((el) => el.classList.add("show"));
    document.querySelector(".container").classList.add("show");
    document
      .querySelectorAll(".player1, .player2")
      .forEach((el) => el.classList.add("show"));

    document.getElementById("vittoria").innerHTML = `${nome1}'s turn!`;
  }
}

function aggiungiPunto() {
  if (turno === 1) {
    punti1++;
    puntiEl1.textContent = punti1;
  } else {
    punti2++;
    puntiEl2.textContent = punti2;
  }

  if (punti1 + punti2 === 9) {
    let vincitore;
    if (punti1 > punti2) vincitore = nome1;
    else if (punti2 > punti1) vincitore = nome2;
    else vincitore = "Draw!";

    document.getElementById("vittoria").innerHTML = `🏆 ${vincitore} wins!`;
  }
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("flipped") || lockBoard) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      aggiungiPunto();
      resetTurn();
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        cambioTurno();
        resetTurn();
      }, 1000);
    }
  });
});

function cambioTurno() {
  turno = turno === 1 ? 2 : 1;
  const nomeTurno = turno === 1 ? nome1 : nome2;
  document.getElementById("vittoria").innerHTML = `${nomeTurno}'s turn!`;
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
