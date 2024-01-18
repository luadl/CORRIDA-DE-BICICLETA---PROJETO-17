var path, mainCyclist;
var player1, player2, player3;
var pathImg, mainRacerImg1, mainRacerImg2;

var oppPink1Img, oppPink2Img;
var oppYellow1Img, oppYellow2Img;
var oppRed1Img, oppRed2Img;
var gameOverImg, cycleBell;

var pinkCG, yellowCG, redCG;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;

function preload() {
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png", "mainPlayer2.png");
  mainRacerImg2 = loadAnimation("mainPlayer3.png");

  oppPink1Img = loadAnimation("opponent1.png", "opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");

  oppYellow1Img = loadAnimation("opponent4.png", "opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");

  oppRed1Img = loadAnimation("opponent7.png", "opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");

  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(1200, 300);

  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  mainCyclist = createSprite(70, 150);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.07;

  gameOver = createSprite(650, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 900, 30);

  if (gameState === PLAY) {
    distance += Math.round(getFrameRate() / 50);
    path.velocityX = -(6 + 2 * distance / 150);

    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    if (path.x < 0) {
      path.x = width / 2;
    }

    if (keyDown("space")) {
      cycleBell.play();
    }

    var select_oppPlayer = Math.round(random(1, 3));

    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCyclists();
      } else if (select_oppPlayer == 2) {
        yellowCyclists();
      } else {
        redCyclists();
      }
    }

    if (pinkCG.isTouching(mainCyclist)) {
      gameState = END;
      player1.velocityY = 0;
      player1.addAnimation("opponentPlayer1", oppPink2Img);
    }
