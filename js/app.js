const boardElm = document.querySelector("#board");
//boardElm.setAttribute("tabIndex", 0); // make the #board focusable to only move the player when you click on the board (necessary?)

class Player {
  constructor() {
    this.width = 5;
    this.height = 5;
    this.positionX = 32;
    this.positionY = 10;

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

  moveUp() {
    this.positionY++;
    this.updateUI();
  }

  moveDown() {
    this.positionY--;
    this.updateUI();
  }
}

class Floor {
  constructor(floor) {
    this.width = 10;
    this.height = 30;
    this.floor = floor;
    this.elevators = [];

    this.updateUI();
  }

  updateUI() {
    for (let i = 0; i < this.floor; i++) {
      const elevator = document.createElement("div");
      elevator.classList.add("elevator");
      elevator.style.width = this.width + "vw";
      elevator.style.height = this.height + "vh";
      this.elevators.push(elevator);
    }

    this.elevators.forEach((element) => {
      boardElm.appendChild(element);
    });
  }
}

const player = new Player();

const floor = new Floor(1);

//Event listener to move player
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    player.moveLeft();
  } else if (event.code === "ArrowRight") {
    player.moveRight();
  } else if (event.code === "ArrowUp") {
    player.moveUp();
  } else if (event.code === "ArrowDown") {
    player.moveDown();
  }
});

// detect if player touches elevator
// NEED TO CREATE ELEVATOR WITH JS
