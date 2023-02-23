var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite (200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  if(gameState === "play"){

  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;

  if (keyDown("left_arrow")){
    ghost.x = ghost.x - 3;

  }
  
  if (keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
    
  }
  
  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y >600) {
    ghost.destroy();
    gameState = "end";
  }
    spawnDoors();
    drawSprites();
  }
  
  if(gameState === "end"){
    stroke("yellow");
    fill ("yellow");
    textSize(30);
    text("fim de jogo ",130,250);
  }

    
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15,climber.width,2);
    invisibleBlock.visible = false;
    climber.addImage(climberImg);
    door.addImage(doorImg);
    door.x = Math.round(random(120,400));
    invisibleBlock.x = door.x;
    climber.x = door.x;
    door.velocityY= 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    ghost.depth = door.depth;
    ghost.depth += 1;
    climbersGroup.add(climber);
    doorsGroup.add (door);
    invisibleBlockGroup.add(invisibleBlock);
  }
}