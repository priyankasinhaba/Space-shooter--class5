var GameOn
var rocket
var playbutton,
aboutbutton,
asteroid,
asteroid2,
asteroid3;
var Gamestate = "1";
var score=0;

function preload(){
GameOn = loadImage("assets/Game On.gif");
asteroid = loadImage("assets/asteroid.png")
asteroid2 = loadImage("assets/Asteroid2.webp")
asteroid3 = loadImage("assets/Asteroid3.jpg")
spacebg = loadImage("assets/spaceimg.jpg")
rocketImg = loadImage("assets/rocket.jpg")
laserImg = loadImage("assets/laser.png")
asteroid4 =loadImage("assets/Asteroid4.webp");


}

function setup(){

createCanvas(500,500);
playbutton = createImg("assets/play.png");
aboutbutton = createImg("assets/about.png");
playbutton.position(400,400);
playbutton.size(70,70)
playbutton.hide();
aboutbutton.position(30,30);
aboutbutton.size(50,50)
aboutbutton.hide();
//score=0;
  enemygroup=new Group();
  laserGroup=new Group();
}

// gamestate 1 is splash screen, 2 is hold, 3 is play, 4 is about, 5 is lose
function draw(){
   
if(Gamestate === "1"){
background(GameOn);
playbutton.show();
aboutbutton.show();
//score.visible=false;
}
playbutton.mousePressed(()=>{

playbutton.hide();
aboutbutton.hide();
Gamestate="2";

})

aboutbutton.mousePressed(()=>{

    playbutton.hide();
    aboutbutton.hide();
    Gamestate="4";
    
    })
if (Gamestate==="4"){
aboutgame();
}
if (Gamestate==="2"){
    bg=createSprite(100,100,900,600);
    bg.addImage(spacebg);
    bg.scale=1.7;
    rocket=createSprite(200,400)
    rocket.addImage(rocketImg);
    rocket.scale = 0.1
    Gamestate="3";
}
if(Gamestate==="3"){
    rocket.visible=true;
    rocket.debug = true;
    bg.velocityY=5;
    if(bg.y>1000){
        bg.y=height/2
    }

if(keyDown("LEFT_ARROW")){
if(rocket.x>25){
    rocket.x=rocket.x-10
}
}
if(keyDown("RIGHT_ARROW")){
    if(rocket.x<460){
        rocket.x=rocket.x+10
    }
    }
    if(keyDown("space")){
       spawnlaser();
       laser.x=rocket.x
       
        }
spawnObstacles();


for (var i = 0; i < enemygroup.length; i++) {
    if (laserGroup.isTouching(enemygroup.get(i))) {
        score += 5;
        enemygroup.get(i).remove()
        laserGroup.destroyEach()
        
    }
}


for (var i = 0; i < enemygroup.length; i++) {
    if (rocket.isTouching(enemygroup.get(i))) {
        rocket.destroy();
         Gamestate="5"
        
    }
}


// if(enemygroup.isTouching(rocket)){
// rocket.destroy();
// Gamestate="5"
// }
// if(enemygroup.isTouching(laserGroup)){
// enemygroup.destroyEach();
// laserGroup.destroyEach();
// score=score+10
// }
    }
   
     
     
drawSprites()
textSize(20);
fill("red")
text("Score: "+ score, 100,100); 
if(Gamestate==="5"){
bg.velocityY=0
swal({
title:"YOU LOST!",
text:"YOU GOT HIT BY THE ASTEROIDS , TRY AGAIN",
textAllign:"center",
confirmButtonText:"Let's Play again ",
confirmButtonColor:"red",
},
function ()  {
    Gamestate = "1"
})

}

}
function aboutgame(){

swal({
title:"How To Play",
text:"control the rocket , hit the alien spaceships and survive the asteroids .",
textAllign:"center",
confirmButtonText:"Let's Play ",
confirmButtonColor:"red",

},
   function ()  {
        Gamestate = "1"
    }
)
}
 function spawnObstacles(){
if(frameCount%60===0){
enemy = createSprite(random(50,400),100,10,40);
enemy.velocityY=2;
var rand = Math.round(random(1,4))
switch(rand){
case 1:enemy.addImage(asteroid)
break;
case 2:enemy.addImage(asteroid2)
break;
case 3:enemy.addImage(asteroid3)
break;
case 4:enemy.addImage(asteroid4)
break;
default: break;
}
enemy.debug = true;
enemy.lifetime = 120;
enemygroup.add(enemy)
enemy.scale=0.08
}

 }
 function spawnlaser(){
laser = createSprite(500,500);
laser.addImage(laserImg);
laser.y = 340;
laser.velocityY=-5;
laserGroup.add(laser);
 laser.scale=0.05
 }