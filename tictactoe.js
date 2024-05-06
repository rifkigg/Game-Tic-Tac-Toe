class TicTacToe {
  constructor(selector) {
    this.parentElement = document.querySelector(selector);
    console.log(selector, this.parentElement);
    this.PlayerList = ["x", "o"];
    this.gameBoard = Array(9).fill("");
    this.Player = 0;
    this.init();
  }

  init() {
    this.buildGame();
  }
  getPlayerLabel() {
    return this.PlayerList[this.Player];
  }

  buildCardPlayer(playerName, PlayerNumber) {
    return `<div class="box-player">
              <p class="player-label ${playerName}">${playerName}</p>
              <p class="player-name">Player ${PlayerNumber}</p>
              <p class="turn">Your Turn!!</p>
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
    this.gameBoardEl = gameBoardEl;
  }

  onClickCell(e, i) {
    console.log("click cell");
    const btn = e.target;
    btn.innerHTML = this.getPlayerLabel();
    btn.classList.add(btn.innerHTML);
    btn.disabled = true;
    this.gameBoard[i] = btn.innerHTML;

    this.checkWinner();
    this.switchPlayer();
    console.log(this.gameBoard);
  }

  switchPlayer(Player = undefined) {
    if (Player != undefined) {
      this.Player = Player;
    } else {
      if (this.Player == 1) {
        this.Player = 0;
      } else {
        this.Player = 1;
      }
    }

    const BoxPlayers = document.querySelectorAll(".box-player");

    BoxPlayers.forEach((box, i) => {
      if (this.Player == i) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });
  }

  gameReset() {
    console.log("reset game");
    this.gameBoard = Array(9).fill("");
    this.switchPlayer(0);

    for (const btn of this.gameBoardEl.children) {
      console.log(btn);
      btn.innerHTML = "";
      btn.classList.remove(...this.PlayerList);
      //btn.classList.remove("x", "o");  bisa menggunakan ini juga bila tidak mengerti
      btn.disabled = false;
    }
  }

  checkWinner() {
    const winConditions = [
      //horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      //vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      //diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];

      if (
        this.getPlayerLabel() == this.gameBoard[a] &&
        this.getPlayerLabel() == this.gameBoard[b] &&
        this.getPlayerLabel() == this.gameBoard[c]
      ) {
        Swal.fire({
          title: "Good Game",
          text: `Congratulions for Player ${this.Player + 1}`,
          showDenyButton: true,
          confirmButtonText: "End Game",
          denyButtonText: `Rematch`,
          icon: "success",
        }).then((result) => {
          for (const btn of this.gameBoardEl.children) {
            btn.disabled = true;
          }
          if (result.isDenied) {
            this.gameReset();
            Swal.fire("Game has been reset ", "", "info");
          }
        });
      }
    }
  }
}
