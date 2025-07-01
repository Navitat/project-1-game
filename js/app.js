const boardElm = document.querySelector("#board");
//boardElm.setAttribute("tabIndex", 0); // make the #board focusable to only move the player when you click on the board (necessary?)
const pointsSelector = document.querySelector("#points-selector");

//
// CLASSES
//

class Player {
  constructor() {
    this.width = 6;
    this.height = 10;
    this.positionX = 1;
    this.positionY = 1;
    this.playerElm = null;
    this.bullets = [];
    this.viewpoint = true; // true = right - false = left
    this.points = 0;
    this.timeRemaining = 10;

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
    this.playerElm.style.transform = "scaleX(-1)";
    if (this.positionX < 0) {
      this.positionX = 0;
    }
    this.updateUI();
  }

  moveRight() {
    this.positionX++;
    this.playerElm.style.transform = "scaleX(1)";
    if (this.positionX > 1) {
      this.positionX = 1;
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
    this.height = 3;
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
    this.height = 1;
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

    // setTimeout(() => {
    //   this.bulletElm.remove();
    // }, 2000);
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

class Objective {
  constructor() {
    this.width = 3;
    this.height = 3;
    this.positionX = Math.floor(Math.random() * (70 - this.width)); //create randomly
    this.positionY = Math.floor(Math.random() * (80 - this.height)); // create randomly
    this.obstacleElm = null;

    this.createDomElement();
  }

  createDomElement() {
    this.obstacleElm = document.createElement("div");
    this.obstacleElm.className = "obstacle";
    this.obstacleElm.style.width = this.width + "vw";
    this.obstacleElm.style.height = this.height + "vh";
    this.obstacleElm.style.left = this.positionX + "vw";
    this.obstacleElm.style.bottom = this.positionY + "vh";

    boardElm.appendChild(this.obstacleElm);

    setTimeout(() => {
      this.obstacleElm.remove();
    }, 8_000);
  }
}

const elevator = new Elevator();
const player = new Player();
pointsSelector.innerText = player.points;

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

//
//TIMER
//
let timer;
timer = setInterval(() => {
  player.timeRemaining--;
  const minutes = Math.floor(player.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (player.timeRemaining % 60).toString().padStart(2, "0");

  //display on time container
  const timeRemainingContainer = document.querySelector("#time-remaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;
}, 1_000);

setTimeout(() => {
  clearInterval(timer);
  alert("GameOver!");
}, 10_000);

//Elevator up and down
setInterval(() => {
  elevator.movement();
}, 100);

// create objectives
const objectivesArr = [];
setInterval(() => {
  const newObjective = new Objective();
  objectivesArr.push(newObjective);
}, 3_000);

// move bullets
setInterval(() => {
  for (let bullet = player.bullets.length - 1; bullet >= 0; bullet--) {
    player.bullets[bullet].moveBullet();

    // check collision with objectives
    for (
      let objective = objectivesArr.length - 1;
      objective >= 0;
      objective--
    ) {
      if (
        player.bullets[bullet].positionX <
          objectivesArr[objective].positionX + objectivesArr[objective].width &&
        player.bullets[bullet].positionX + player.bullets[bullet].width >
          objectivesArr[objective].positionX &&
        player.bullets[bullet].positionY <
          objectivesArr[objective].positionY +
            objectivesArr[objective].height &&
        player.bullets[bullet].positionY + player.bullets[bullet].height >
          objectivesArr[objective].positionY
      ) {
        pointsSelector.innerText = player.points += 1;
        objectivesArr[objective].obstacleElm.remove();
        objectivesArr.splice(objective, 1);

        player.bullets[bullet].bulletElm.remove();
        player.bullets.splice(bullet, 1);
        console.log(player.points);
        break;
      }
    }
  }
}, 50);
