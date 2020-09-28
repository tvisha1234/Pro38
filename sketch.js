var PLAY = 0;
var END = 1;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var gameOver, restart;
var gameOverImg, restartImg;

var end;


function preload(){
  trex_running = loadImage("boy.jpg");

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("car1.jpg");
  obstacle2 = loadImage("car2.jpg");
  obstacle3 = loadImage("car3.jpg");
  obstacle4 = loadImage("car4.jpg");
  obstacle5 = loadImage("car5.jpg");
  obstacle6 = loadImage("car6.jpg");
}

function setup() {
  createCanvas(displayWidth - 200, displayHeight- 200);
  
  trex = createSprite((displayWidth/3) - 100,(displayHeight/3) - 100,20,50);
  trex.addImage("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite((displayWidth/2)-200,(displayHeight/2)-200,4000,20);
  ground.addImage("ground",groundImage);
  
  invisibleGround = createSprite((displayWidth/2)-190,(displayHeight/2)-190,4000,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  end = 0;
}

function draw() {
  background("white");
  text("Score: "+ Math.round(score/5), trex.x + 400,20);
  text("Total Time: 39", trex.x + 400, -20);
  text("Time Elapsed: "+ Math.round(end/100), trex.x + 400,0);
  
  camera.position.x = trex.x;
  camera.position.y = 100;
  
  console.log(gameState);
  
  if(gameState === PLAY) {
    
    trex.x = trex.x + 5;
    
    for(var i = 0; i < 10; i++) {
      end++;
    }
    
    for(var i = 0; i < 10; i++) {
      score++;
    }
     ground.x = ground.x + 3;
      invisibleGround.x = invisibleGround.x + 3;
    
    if(keyDown("space")) {
      trex.velocityY = -10;
    }
     
    trex.velocityY = trex.velocityY + 0.8;
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    trex.collide(invisibleGround);
    
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex) || trex.x >= 2250) {
      gameState = END;
      
    }
  }
  
  else if(gameState === END) {

    textSize(40);
    text("Game Over", trex.x-50, trex.y -200);
    
    trex.velocityX = 0;

    ground.velocityX = 0;
    trex.velocityY = 0;

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityYEach(0);
    cloudsGroup.setVelocityYEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  }

  drawSprites();
}
 
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var cloud = createSprite(trex.x + 500,130,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityY = cloud.velocityY + 0.08;
    cloud.velocityX = -2;
    cloud.collide(invisibleGround);
    
     //assign lifetime to the variable
    cloud.lifetime = displayWidth;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(trex.x + 500,175,10,40);
    obstacle.velocityX = -2;
    obstacle.velocityY = obstacle.velocityY + 0.08;
    obstacle.collide(invisibleGround);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = displayWidth;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}