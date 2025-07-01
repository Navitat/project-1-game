const boardElm = document.querySelector("#board");
//boardElm.setAttribute("tabIndex", 0); // make the #board focusable to only move the player when you click on the board (necessary?)

class Player {
  constructor() {
    this.width = 2;
    this.height = 5;
    this.positionX = 4;
    this.positionY = 1;
    this.playerElm = null;
    this.bullets = [];
    this.viewpoint = true; // true = right - false = left

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
    if (this.positionX > 5) {
      this.positionX = 5;
    }
    this.updateUI();
  }

  shoot() {
    // console.log("pew pew!");
    const bulletVerticalPos = elevator.positionY + player.height * 0.8;

    const bulletSpeed = player.viewpoint ? 1 : -1;

    const bullet = new Bullet(bulletVerticalPos, bulletSpeed, this.positionX);
    this.bullets.push(bullet);
    //console.log(this.bullets);
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

    if (this.positionY === 68 || this.positionY === 0) {
      this.direction *= -1;
    }

    this.updateUI();
  }
}

class Bullet {
  constructor(startingY, bulletSpeed, startingX) {
    this.width = 1;
    this.height = 0.5;
    this.positionX = 35; // should be startingX
    this.positionY = startingY;
    //console.log(this.positionY);
    this.bulletElm = null;
    this.speed = bulletSpeed;

    this.createDomElement();
  }

  createDomElement() {
    this.bulletElm = document.createElement("div");
    this.bulletElm.className = "bullet";
    this.bulletElm.style.width = this.width + "vw";
    this.bulletElm.style.height = this.height + "vh";
    this.bulletElm.style.left = this.positionX + "vw";
    this.bulletElm.style.bottom = this.positionY + "vh";

    // const playerElm = document.querySelector("#player");
    boardElm.appendChild(this.bulletElm);

    setTimeout(() => {
      this.bulletElm.remove();
    }, 2000);
  }

  updateUI() {
    this.bulletElm.style.left = this.positionX + "vw"; //left in CSS
    this.bulletElm.style.bottom = this.positionY + "vh";
  }

  moveBullet() {
    this.positionX += this.speed;
    this.updateUI();
  }
}

const elevator = new Elevator();
const player = new Player();

//Event listener to move player
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    player.viewpoint = false;
    player.moveLeft();
  } else if (event.code === "ArrowRight") {
    player.viewpoint = true;
    player.moveRight();
  } else if (event.code === "Space") {
    player.shoot();
  }
});

//Elevator up and down
setInterval(() => {
  elevator.movement();
}, 100);

// move bullets
setInterval(() => {
  player.bullets.forEach((element) => {
    element.moveBullet();
  });
}, 30);
