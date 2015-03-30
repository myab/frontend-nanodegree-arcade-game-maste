//Global Variables
var ENEMY_X = -90;
var PLAYER_Y = 404;
var ENEMY_BLOCK_X = 101;
var ENEMY_BLOCK_Y = 83;
var MIN_LEFT = 0;
var MAX_RIGHT = 400;
var MIN_UP = 70;
var MAX_BOTTOM= 404;

// function below return a random number of enemy location and speed
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Create lanes array to define the rows for enemy
    this.lanes = [72, 155, 238, 321];
    // Call getRandom function to get a random number from 0 - 3
    this.pickLane = getRandom(0,3);
    // Assign y with the value of element from lanes array
    this.y = this.lanes[this.pickLane];
    this.x = ENEMY_X;

    //call getRandom() to get random speed
    this.speed = getRandom(100, 150);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

function getEnemies(){
    //Create new enemy
    var enemy = new Enemy();
    var enemyTotal = 20;
    //Add enemy to allEnemies array
    allEnemies.push(enemy);
    //Remove the first enemy created when enemyTotal is
    //reached to allow random placement of new enemy and keep the array length to 10.
    if(allEnemies.length === enemyTotal + 1){
        allEnemies.shift();
    }
}
//TODO: uncomment function below before submit
//setInterval call createEnemies function to create enemies at 3 second intervals
var enemiesInterval = setInterval(getEnemies, 1000);
///console.log("spawnInterval: " + spawnInterval);

// Create Player class
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    //block width (x) & height (y) used to
    //calculate move distance from start position
    this.xBlock = ENEMY_BLOCK_X;
    this.yBlock = ENEMY_BLOCK_Y;
    //Player starting position
    this.x = ENEMY_BLOCK_X * 2;
    this.y = PLAYER_Y;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {
    checkCollisions();
}

//Change keyboard input into player movement
Player.prototype.handleInput = function(direction) {
    if(direction === 'left' && this.x > MIN_LEFT) {
        this.x -= this.xBlock;
    } else if (direction === 'right' && this.x < MAX_RIGHT) {
        this.x  += this.xBlock;
    } else if (direction === 'up' && this.y > MIN_UP) {
        this.y  -= this.yBlock;
    } else if (direction === 'down' && this.y < MAX_BOTTOM) {
        this.y += this.yBlock;
    } else {
        return false;
    }


    console.log('Player: X= ' + this.x + ' Y= ' + this.y);
}

//Initialize player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Checks for player/bug intersections and resets player.
function checkCollisions() {
    if(allEnemies.length >= 1) {
        allEnemies.forEach(function(enemy) {
            //Check location of all enemies against player location
            //reset player if collision
            if(player.y === enemy.y && player.x < (enemy.x + 80)) {
                if(player.x > (enemy.x - 80)){
                    alert("UH OH! The Enemy got you. It's ok. Try again!");
                    player.x = 202;
                    player.y = 404;
                };
            }
            if(player.y === -11){
                alert("CONGRATULATIONS, You crossed the road Safely!!");
                player.x = 202;
                player.y = 404;
            }
        })
    }
}