const boardElm = document.querySelector("#board");
//boardElm.setAttribute("tabIndex", 0); // make the #board focusable to only move the player when you click on the board (necessary?)

class Player {
  constructor() {
    this.width = 3;
    this.height = 10;
    this.positionX = 4;
    this.positionY = 1;

    this.updateUI();
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
    this.width = 10;
    this.height = 20;
    this.positionY = 0; // bottom in css
    this.elevatorElm = null;

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

  move() {
    //this.positionY++;
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
  elevator.move();
}, 5_00);
