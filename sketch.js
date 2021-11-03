var pontuacao = 0

var pulo,die,ponto

var trex, trexCorrendo, trexVesgo;

var reset,resetimagen

var gameOver,gameoverimagina

var chaoImagem, chaoInvisivel, chao;

var myfriendnuvem;

var cactur1,cactur2,cactur3,cactur4,cactur5,cactur6;

var estadodejogo = "jogando"

var grupodoscactur;

var grupodasnuvens;

var mensagem

function cactur(){
   if (frameCount % 70=== 0 ){
      var cacturo = createSprite(600, 170, 10, 20);
       cacturo.velocityX = -(5+pontuacao /100);
     grupodoscactur.add(cacturo)
     numero =  Math.round(random(1,6));
     console.log(numero);
     cacturo.lifetime = 120
     switch(numero){
       case 1: cacturo.addImage(cactur1)
         break;
          case 2: cacturo.addImage(cactur2)
         break;
         case 3: cacturo.addImage(cactur3)
         break;
         case 4: cacturo.addImage(cactur4)
         break;
         case 5: cacturo.addImage(cactur5)
         break;
         case 6: cacturo.addImage(cactur6)
         break;
         default:break
         
     }
         cacturo.scale = 0.4;
   }
 
}
function reiniciar(){
  
  estadodejogo = "jogando" 
  grupodoscactur.destroyEach()
  grupodasnuvens.destroyEach()
  pontuacao = 0
    gameOver.visible = false;
    reset.visible = false;
   trex.changeAnimation("correndo", trexCorrendo);
}
  
function criadordenuvens(){
  if (frameCount % 60=== 0 ){
  var nuvem = createSprite(600, 50, 40, 10);
    nuvem.scale = 0.9;
  nuvem.velocityX = -5;
    grupodasnuvens.add(nuvem)
    nuvem.y =  Math.round(random(50,120));
    nuvem.addImage(myfriendnuvem);
    nuvem.depth = trex.depth;
    trex.depth = trex.depth +1;
    nuvem.lifetime = 135
      }

}

function preload() {
  trexCorrendo = loadAnimation('trex1.png', 'trex3.png', 'trex4.png');
  trexVesgo = loadAnimation("trex_collided.png");
  chaoImagem = loadImage('ground2.png');
  
  myfriendnuvem = loadImage('cloud.png');
  
  cactur1 = loadImage('obstacle1.png');
    cactur2 = loadImage('obstacle2.png');
    cactur3 = loadImage('obstacle3.png');
    cactur4 = loadImage('obstacle4.png');
    cactur5 = loadImage('obstacle5.png');
    cactur6 = loadImage('obstacle6.png');
  
  gameoverimagina = loadImage('gameOver.png');
  resetimagen = loadImage('restart.png');
  
  die = loadSound('die.mp3');
  pulo = loadSound('jump.mp3');
  ponto = loadSound('checkPoint.mp3');
}

function setup(){
  createCanvas(600,200)
  
  trex = createSprite(50, 150, 20, 40);
  trex.scale = 0.7;
  trex.addAnimation("correndo", trexCorrendo);
  trex.addAnimation("Vesgo", trexVesgo);
  
  trex.setCollider("circle",0,0,40)
  chaoInvisivel = createSprite(300, 200, 1300, 15);
  chaoInvisivel.visible = false;
  
  
  reset = createSprite(300, 120, 50, 50);
  reset.addImage("resetover :)",resetimagen);
  reset.visible = false;
  chao = createSprite(300, 185, 1300, 20);
  
   mensagem = "eae quer sai?"
 
  chao.addImage("chao :)",chaoImagem )
  
 grupodoscactur = new Group();
  grupodasnuvens = new Group();
  
  gameOver = createSprite(300, 50, 50, 50)
  gameOver.addImage("gameoverimagina :)",gameoverimagina)
  gameOver.visible = false
  
}

function draw(){
  background('white');
  
 text("pontuação: "+ pontuacao,20,20) 

  trex.velocityY  = trex.velocityY + 0.5;
  
  trex.collide(chaoInvisivel);
   console.log(mensagem)
 
  if (estadodejogo === "jogando"){
    chao.velocityX = -(5+pontuacao /100);
      pontuacao = pontuacao +Math.round(frameRate()/60);
    if(pontuacao > 0 && pontuacao%100 ===0){
      ponto.play();
    }
     if (keyDown("space") &&trex.y > 156) {
    trex.velocityY = -8;  
       pulo.play();
  }
          if (chao.x<0){
    chao.x = chao.width/2
  }
    cactur();
  criadordenuvens();
    if (grupodoscactur.isTouching(trex)){
        estadodejogo = "p.d"
      trex.changeAnimation("Vesgo", trexVesgo);
      die.play();
      
        }
      }
  else if (estadodejogo === "p.d") {
  chao.velocityX  = 0
    grupodoscactur.setVelocityXEach(0);
    grupodasnuvens.setVelocityXEach(0);
    grupodoscactur.setLifetimeEach(-1);
    grupodasnuvens.setLifetimeEach(-1);
    gameOver.visible = true;
    reset.visible = true;
    
    if (mousePressedOver(reset)){
      reiniciar()
      
    }
  }
  
  
  
  
  drawSprites();
}