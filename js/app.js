const boardElm = document.querySelector("#board");
//boardElm.setAttribute("tabIndex", 0); // make the #board focusable to only move the player when you click on the board (necessary?)

class Player {
  constructor() {
    this.width = 2;
    this.height = 7;
    this.positionX = 4;
    this.positionY = 1;
    this.playerElm = null;

    this.createPlayer();
  }

  createPlayer() {
    this.playerElm = document.createElement("div");
    this.playerElm.setAttribute("id", "player");
    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";
    this.playerElm.style.left = this.positionX + "vw";
    this.playerElm.style.bottom = this.positionY + "vh";

    const elevatorElm = document.querySelector("#elevator");
    elevatorElm.appendChild(this.playerElm);
  }

  updateUI() {
    const playerElm = document.querySelector("#player");
    playerElm.style.width = this.width + "vw";
    playerElm.style.height = this.height + "vh";
    playerElm.style.left = this.positionX + "vw";
    playerElm.style.bottom = this.positionY + "vh";
  }

  moveLeft() {
    this.positionX--;
    if (this.positionX < 0) {
      this.positionX = 0;
    }
    this.updateUI();
  }

  moveRight() {
    this.positionX++;
    if (this.positionX > 64.5) {
      this.positionX = 64.5;
    }
    this.updateUI();
  }
}

class Elevator {
  constructor() {
    this.width = 7;
    this.height = 15;
    this.positionY = 0; // bottom in css
    this.elevatorElm = null;
    this.direction = 1;

    this.createElevator();
  }

  createElevator() {
    this.elevatorElm = document.createElement("div");
    this.elevatorElm.setAttribute("id", "elevator");
    this.elevatorElm.style.width = this.width + "vw";
    this.elevatorElm.style.height = this.height + "vh";
    this.elevatorElm.style.bottom = this.positionY + "vh";

    boardElm.appendChild(this.elevatorElm);
  }

  updateUI() {
    this.elevatorElm.style.bottom = this.positionY + "vh";
  }

  movement() {
    this.positionY += this.direction * 2;

    if (this.positionY === 32 || this.positionY === -32) {
      this.direction *= -1;
    }

    this.updateUI();
  }
}

const elevator = new Elevator();
const player = new Player();

//Event listener to move player
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    player.moveLeft();
  } else if (event.code === "ArrowRight") {
    player.moveRight();
  }
});

setInterval(() => {
  elevator.movement();
}, 2_00);

// setInterval(() => {
//   elevator.moveDown();
// }, 2_00);
