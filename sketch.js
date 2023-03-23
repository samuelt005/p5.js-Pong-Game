//Ball Variables
let xBall = 300;
let yBall = 200;
let diameter = 15;
let radius = diameter/2;

//Rackets Variables
let xRacket = 5;
let yRacket = 170;
let wRacket = 10;
let hRacket = 60;
let racketSpeed = 4;
let racketCollision = false;

//Enemy Variables
let xEnemy = 585;
let yEnemy = 50;
let enemySpeed;
let enemyFail;
let missingFactor = 0;

//Ball Speed
let xSpeed = 6;
let ySpeed = 6;

//Game Score
let myScore = 0;
let enemyScore = 0;

//Sounds
let racketSound;
let scoreSound;

//Pre-load
function preload () {
  racketSound = loadSound("sounds/racket.mp3");
  scoreSound = loadSound("sounds/score.mp3");
}

//Canvas
function setup() {
  createCanvas(600, 400);
}

//Draw
function draw() {
  background(0);
  drawLine ();
  ball ();
  ballMovement ();
  ballCollision ();
  racket (xRacket,yRacket);
  racketControll ();
  racket (xEnemy,yEnemy);
  enemyMovement ();
  //racketsCollision ();
  p5racketCollision (xRacket,yRacket);
  p5racketCollision (xEnemy,yEnemy);
  createScore ();
  addScore ();
  missingFactorCalculation();
}

//Functions
function ball () {
  circle (xBall,yBall,diameter);
}
function ballMovement () {
  xBall += xSpeed;
  yBall += ySpeed;
}
function ballCollision (x,y) {
  if (xBall > width - radius || xBall < radius) {
  xSpeed *= -1;
  }
  if (yBall > height - radius || yBall < radius) {
  ySpeed *= -1;
  }
}
function racket (x,y) {
  rect (x, y, wRacket, hRacket);
}
function drawLine () {
  rect (299, 0, 2, 400);
}
function racketControll () {
  if (keyIsDown(UP_ARROW)) {yRacket -= racketSpeed;}
  if (keyIsDown(DOWN_ARROW)) {yRacket += racketSpeed;}
}
function enemyMovement () {
  enemySpeed = yBall - yEnemy - hRacket/2;
  yEnemy += enemySpeed + missingFactor;
}
function missingFactorCalculation () {
    if (enemyScore >= myScore) {
    missingFactor += 1
    if (missingFactor >= 34){
    missingFactor = 35
    }
  } else {
    missingFactor -= 1
    if (missingFactor <= 30){
    missingFactor = 30
    }
  }
}
function racketsCollision () {
  if (xBall - radius < xRacket + wRacket && yBall - radius < yRacket + hRacket && yBall + radius > yRacket)
   {xSpeed *= -1;}
}
function p5racketCollision (x,y) {
  racketCollision = collideRectCircle(x, y, wRacket, hRacket, xBall, yBall, radius);
  if (racketCollision) {
    xSpeed *= -1;
    racketSound.play();
  }
}
function createScore () {
  stroke (255);
  textAlign(CENTER);
  textSize (16);
  fill (color (253, 118, 0));
  rect (259, 0, 40, 20);
  rect (301, 0, 40, 20);
  fill (255);
  text (myScore, 278, 16);
  text (enemyScore, 320, 16);
  //text (missingFactor, 20, 20);
}
function addScore () {
  if (xBall < 0 + radius) {
  enemyScore += 1;
  scoreSound.play();
  }
  if (xBall > 600 - radius) {
  myScore += 1;
  scoreSound.play();
  }
}