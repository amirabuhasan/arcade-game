var playerXPosition;
var playerYPosition;
var enemyXPosition;
var enemyYPosition;
var score = 0;
var highscore = localStorage.getItem("highscore");

// creates enemies that the player must avoid.
class Enemy {
  constructor(y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = Math.floor((Math.random()*300)+200);
  };

  // Updates the enemy's position.
  update(dt) {
    if (this.x <= 500) {
      this.x += this.speed * dt
    } else if (this.x > 500) {
      this.speed = Math.floor((Math.random()*300)+200);
      this.x = 0;
    }
  };

  // Draw the enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};

// creates the "player" character, that the player controls.
class Player {
  constructor(){
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 400;
    $(".high-score").append(highscore);
  };

  // Updates the player's position.
  update() {
    if (this.x <= 0) {
      this.x = 0;
    } else if (this.x >= 400) {
      this.x = 400;
    }
    if (this.y <= 35) {
      addScore();
      this.y = 400;
    } else if (this.y >= 400) {
      this.y = 400;
    }
    this.collisions();
  };

  //checks for collisions based on the position of the player on the y & x-axis, as opposed to the enemy's position.
  collisions() {
    if ((this.y === enemy1.y && enemy1.x - this.x > - 50 && enemy1.x - this.x < 50) ||
    (this.y === enemy2.y && enemy2.x - this.x > - 50 && enemy2.x - this.x < 50) ||
    (this.y === enemy3.y && enemy3.x - this.x > - 50 && enemy3.x - this.x < 50)){
      this.y = 400;
      gameEnd();
      document.removeEventListener('keyup', keyUp);
    };
  };

  // Draws the player on the screen.
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // Handles the user's keyboard input.
  handleInput(keyCode){
    if (keyCode === "up") {
      this.y -= 85;
    }
    if (keyCode === "down") {
      this.y += 85;
    }
    if (keyCode === "right") {
      this.x += 100;
    }
    if (keyCode === "left") {
      this.x -= 100;
    }
  };
};


// // Function that runs upon the player colliding with an enemy.
// Checks if the user's score beats the current high score.
// If it does, it stores the new high score to localStorage.
// Triggers a modal that states the user's score, and allows the user to restart the game.
function gameEnd() {
  if(highscore !== null){
    if (score > highscore) {
      $("h1").append("You set a new high score!");
      localStorage.setItem("highscore", score);
    }
    else{
      $("h1").append("Unlucky mate!");
    }
  }
  else {
    localStorage.setItem("highscore", score);
  }
  $(".popup").append("Your score was: " + score);
  $(".modal").addClass("is-active");
  restartGame();
};

// Allows user to restart game on button click, or by pressing the "Enter" key.
function restartGame() {
  $(".wrap").on("click", function(){
    location.reload();
  })
  $("body").keyup(function(event){
    if(event.keyCode == 13){
        $(".js-close").click();
    }
  });
};

// Keeps track of the user's score.
function addScore() {
  score += 1;
  $(".score").empty();
  $(".score").append(score);
};


// Instances of the Player and Enemy classes.
var player = new Player();
var enemy1 = new Enemy(60);
var enemy2 = new Enemy(145);
var enemy3 = new Enemy(230);
var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to
// Player.handleInput() method.
function keyUp(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
};

document.addEventListener('keyup', keyUp);
