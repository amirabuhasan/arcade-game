// Enemies our player must avoid
var playerXPosition;
var playerYPosition;
var enemyXPosition;
var enemyYPosition;
var score = 0;
var highscore = localStorage.getItem("highscore");



var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = Math.floor((Math.random()*300)+200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
  if (this.x <= 500) {
    this.x += this.speed * dt
  } else if (this.x > 500) {
    this.speed = Math.floor((Math.random()*300)+200);
    this.x = 0;
  }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Enemies our player must avoid

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 400;
    $(".high-score").append(highscore);
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks

Player.prototype.update = function() {
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


//adds score
function addScore() {
  score += 1;
  $(".score").empty();
  $(".score").append(score);
};



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

//checks for collisions
Player.prototype.collisions = function() {
  if ((this.y === enemy1.y && enemy1.x - this.x > - 50 && enemy1.x - this.x < 50) ||
  (this.y === enemy2.y && enemy2.x - this.x > - 50 && enemy2.x - this.x < 50) ||
  (this.y === enemy3.y && enemy3.x - this.x > - 50 && enemy3.x - this.x < 50)){
    this.y = 400;
    gameEnd();
    document.removeEventListener('keyup', keyUp);
  };
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode){
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var enemy1 = new Enemy(60);
var enemy2 = new Enemy(145);
var enemy3 = new Enemy(230);
var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

function keyUp(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', keyUp);
