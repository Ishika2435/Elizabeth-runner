// const Engine = Matter.Engine;
// const World = Matter.World;
// const Bodies = Matter.Bodies;
// const Constraint = Matter.Constraint;

var bg1, bg2, bg3

var elizabeth

var obs1, obs2, obs3, obs4, obs5, obs6, obs7, obs8, obs9, obs10, obs11

var invisibleGround

var score = 0

var turtle

var GameOver

//var mute, unmute

function preload(){
  bg1 = loadImage("images/bkg1.png");
  bg2 = loadImage("images/bkg2.png");
  bg3 = loadImage("images/bkg.png");
  bg4 = loadImage("images/bkg5.png");
  bg5 = loadImage("images/stage1.png");
  bg6 = loadImage("images/stage2.png");

  eliImage = loadAnimation("images/eli1.png", "images/eli2.png", "images/eli3.png", "images/eli4.png");
  eli2Image = loadAnimation("images/eli5.png", "images/eli6.png");
  eli3Image = loadAnimation("images/eli7.png");
  eli4Image = loadAnimation("images/eli9.png");

  obs1Image = loadImage("images/animal1.png");
  obs2Image = loadImage("images/bottle.png");
  // obs3Image = loadImage("images/ball1.png");
  // obs4Image = loadImage("images/duck.png");
  // obs5Image = loadImage("images/bow.png");
  // obs6Image = loadImage("images/slipper.png");
  // obs7Image = loadImage("images/doll.png");
  // obs8Image = loadImage("images/cork.png");
  // obs9Image = loadImage("images/paperPlane.png");
  // obs10Image = loadImage("images/leaf.png");
  // obs11Image = loadImage("images/leaf2.png");

  gameOverImg = loadImage("images/GameOver.png");

  music = loadSound("TurtleCrusher.mp3");
  }

//Function to set initial environment
function setup() {
  createCanvas(1500,700);
 // engine = Engine.create();
 // world = engine.world;

  park = createSprite(2600,350);
  park.addImage(bg3);
  park.scale = 1.8
  park.velocityX = -6;

  stage = createSprite(750,350);
  stage.addImage(bg6);
  stage.visible = false;
 
  elizabeth = createSprite(100,600);
  elizabeth.addAnimation("elirunning", eliImage);
  elizabeth.addAnimation("elijumping", eli2Image);
  elizabeth.addAnimation("elistanding", eli3Image);
  elizabeth.scale = 1.5
  // elizabeth.velocityX = 2;
  elizabeth.debug = false;
  elizabeth.setCollider("rectangle", 0, 0, 65,150);

  gameOver = createSprite(750,350);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.5;
  gameOver.visible = false;

  // mute = createImg("mute button.png");
  // mute.position(1400,100);
  // mute.size(50,50);
  // mute.mouseClicked(muteMusic);

  // unmute = createImg("unmute button.png");
  // unmute.position(1400,50);
  // unmute.size(50,50);
  // unmute.mouseClicked(unmuteMusic);

  obsGroup=new Group();

  invisibleGround = createSprite(750,600,1700,15);
  invisibleGround.visible = false;

  textSize(20); 
}

// function to display UI
function draw() {
  score = score + (round(frameCount/100));
 //music.play()



  if(keyWentDown("space")){
    elizabeth.velocityY = -12;
    elizabeth.changeAnimation("elijumping", eli2Image);
  }
  if(keyWentUp("space")){
    elizabeth.changeAnimation("elirunning");
  }



  elizabeth.velocityY = elizabeth.velocityY+0.2;
  elizabeth.collide(invisibleGround);
  //obs1.collide(invisibleGround);
  console.log(elizabeth.y)

    spawnObstacles();

  if(score > 1900){
    park.velocityX = 0  
    elizabeth.velocityX = 5;
  }
  if(elizabeth > 1500){
    stage.visible = true;
  }

  drawSprites();

  if(elizabeth.isTouching(obsGroup)){
    elizabeth.changeAnimation("elistanding");
    elizabeth.velocityX = 0;
    park.velocityX = 0;
    obsGroup.velocityX = 0;
    score = 0;
    gameOver.visible = true;
    obsGroup.setLifetimeEach(-1);
  }

  stroke("black"); 
  text("Score = " + score, 20,20);

}

function spawnObstacles(){
  if(frameCount % 100 === 0){
  obs = createSprite(random(1500,1400),550);
  obs.velocityX = -6;
  obs.scale = 0.4;
  obs.debug = false;
  obs.lifetime=300;

  //obs1.setCollider("rectangle", 0, 0, 140,50);

  // obs2 = createSprite(1000,550);
  // obs2.addImage(obs2Image);
  // obs2.scale = 0.4;
  var i = Math.round(random(1,2))
  switch(i){
    case 1 : obs.addImage(obs1Image);
    break;
    case 2 : obs.addImage(obs2Image);
    break;
    // case 3 : obs.addImage(obs3Image);
    // break;
    // case 4 : obs.addImage(obs4Image);
    // break;
    // case 5 : obs.addImage(obs5Image);
    // break;
    // case 6 : obs.addImage(obs6Image);
    // break;
    // case 7 : obs.addImage(obs7Image);
    // break;
    // case 8 : obs.addImage(obs8Image);
    // break;
    // case 9 : obs.addImage(obs9Image);
    // break;
    // case 10 : obs.addImage(obs10Image);
    // break;
    // case 11 : obs.addImage(obs11Image);
    // break;
    default:
    break;
  }
  obsGroup.add(obs);
  }
}

function muteMusic(){
  music.stop();
}
function unmuteMusic(){
  music.play();
}