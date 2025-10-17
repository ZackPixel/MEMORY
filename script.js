const cards = document.querySelectorAll(".flip-card");

const container = document.querySelector(".container");
const cardsArray = Array.from(cards);
const shuffled = cardsArray.sort(() => Math.random() - 0.5);
shuffled.forEach((card) => container.appendChild(card));

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const puntiEl = document.getElementById("valore-punti");
let punti = 0;

function aggiungiPunto() {
  punti++;
  puntiEl.textContent = punti;

  if (punti === 9) {
    document.getElementById("vittoria").innerHTML = "Hai vinto!";
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
      console.log("lost ❌");
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetTurn();
      }, 1000);
    }
  });
});

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
