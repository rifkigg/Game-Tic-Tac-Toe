class TicTacToe {
  constructor(selector) {
    this.parentElement = document.querySelector(selector);
    console.log(selector, this.parentElement);
    this.PlayerList = ["x", "o"];
    this.init();
  }

  init() {
    this.buildGame();
  }
  buildCardPlayer(playerName, PlayerNumber) {
    return `<div class="box-player">
              <p class="player-label ${playerName}">${playerName}</p>
              <p class="player-name">Player ${PlayerNumber}</p>
              <p>Your Turn!!</p>
            </div>`;
  }
  buildGame() {
    //game Info
    const gameInfoEl = document.createElement("div");
    gameInfoEl.className = "game-info";

    let playerCards = "";
    this.PlayerList.forEach((player, index) => {
      playerCards += this.buildCardPlayer(player, index + 1);
    });

    gameInfoEl.innerHTML = playerCards;

    //button reset
    const divReset = document.createElement("div");
    divReset.className = "reset-game";
    const buttonReset = document.createElement("button");
    buttonReset.classList.add("btn", "btn-reset"); //classList.add untuk menambahkan banyak class pada element
    buttonReset.innerHTML = "Reset";
    buttonReset.addEventListener("click", () => this.gameReset());
    divReset.appendChild(buttonReset);
    gameInfoEl.appendChild(divReset);

    //game Play
    const gameBoardEl = document.createElement("div");
    gameBoardEl.className = "game-board";

    for (let i = 0; i < 9; i++) {
      const kotak = document.createElement("button");
      kotak.className = "kotak-tic-tac-toe";
      kotak.addEventListener("click", (e) => this.onClickCell(e, i));
      gameBoardEl.appendChild(kotak);
    }

    //append to parent element (.game)
    this.parentElement.append(gameInfoEl, gameBoardEl); //kalau pakai appendChild, harus satu per satu jika pakai append saja bisa banyak
  }

  onClickCell(e, i) {
    console.log("click cell", e, i);
  }

  gameReset() {
    console.log("reset game");
  }
}
