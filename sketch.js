
var target,bgpic,bg,targetpic,targetGroup,arrowpic,arrow,bound1,bound2
var PLAY = 2;
var END = 1;
var PREGAME = 0
var gameState = PREGAME;
var score = 0
var lives = 3
var level = 1

function preload()
{
	bgpic = loadImage("coolbackground.png")
	targetpic = loadImage("cooltarget.png")
	arrowpic = loadImage("arrow.png")
}

function setup() {
	createCanvas(600,600);

	bg = createSprite(300,300,600,600)
	bg.addImage(bgpic)
	bg.scale = 2

	arrow = createSprite(300,300,10,10)
	arrow.addImage(arrowpic)
	arrow.scale = 0.3

	bound1 = createSprite(300,0,600,1)
	bound2 = createSprite(300,600,600,1)
	targetGroup = createGroup();
}


function draw() {
	background(0);
	
	
	if(gameState === PLAY){
	arrow.x = mouseX
	arrow.y = mouseY
	if(targetGroup.isTouching(arrow)){
		targetGroup.destroyEach(target)
		score += 1
	}

	if(score > 19 && score % 20 === 0){
		level = score/20 + 1
	}
	
	if(targetGroup.isTouching(bound1)|| targetGroup.isTouching(bound2)){
		targetGroup.destroyEach();
		lives -= 1
	}
	
}
SpawnTarget();
  drawSprites();
  if(gameState == PREGAME){

	stroke("white");
	textSize(20)
	text("PRESS THE SPACE BAR TO START!",150,400)
	text("-Hit the target with your arrow",150,430)
	text("-Every 20 targets you will level up",150,460)
	text("-Each level is harder",150,490)
	text("-Game will end if you miss 3 targets",150,520)
	text("-Have Fun!",150,550)
	if(keyDown('Space')){
		gameState = PLAY
	}
}
	if(lives < 1){
		reset();

	}
  stroke("white");
  textSize(20)
  text("score: " + score,500,50)
  text("level: " + level,500,70)
  text("lives: " + lives,500,90)
}




function SpawnTarget(){
	if(gameState === PLAY){
	if (frameCount % (50 - level * 5) === 0){
		var target = createSprite(700,700,10,10);
		target.addImage(targetpic)
		target.scale = 0.15
		target.x = random(50,550)
		

		r = Math.round(random(1,2))
		if(r === 1){
			target.y = 20
			target.velocityY = Math.round(random(level * 5, level * 5 + 10))
			}
		  
		  else if(r===2) {
			target.y = 580
			target.velocityY = Math.round(random(-level * 5,-level * 5 - 10))
			}
		  

		target.lifetime = 200
	
		targetGroup.add(target)
	}
}
}

function reset(){
	gameState = END;
	stroke("white");
	textSize(20)
	text("Press R to retry!",150,400)
	text("Your final score is: " + score,150,430)
	if(keyDown('R')){
		gameState = PLAY
		score = 0
		lives = 3
		level = 1
		}
	  }
