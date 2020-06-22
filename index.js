// var
var colours = ["red", "blue", "green", "yellow"];
var game = [];
var answer = [];
var started= false;
var lvl=0;
var wrong = new Audio("sounds/wrong.mp3")
// start game
$(".play-btn").on("click", start);

function start(){
  if(game.length==0){
    $(".game p").fadeOut(1000)
    started= true;
    gameDisplay()
    document.querySelector(".play-btn").id="play-btn";
  }
}

// gameDisplay
function gameDisplay(){
  lvl++
  $(".play-btn").text(lvl)

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = colours[randomNumber];
  game.push(randomChosenColour);

 setTimeout( function(){
   pressed(randomChosenColour);
   playAudio(randomChosenColour);
 } , 800);
}

// you choose color
$(".color").on("click", function(){
  var yourChosenColor = this.id ;
  answer.push(yourChosenColor);

 checkAnswer();

  pressed(yourChosenColor);
  playAudio(yourChosenColor);
});

function checkAnswer(){
  let checkPlace =answer.length-1;

  if(answer[checkPlace]===game[checkPlace] ) {
    if(lvl==29) {gameOver()}
    if(checkPlace===game.length-1){
       gameDisplay();
        answer=[];
    }
  }else if(answer[checkPlace]!==game[checkPlace]) {gameOver()}
}

function pressed(color){
  $("."+color).addClass(color+"-pressed");
  setTimeout( function(){ $("."+color).removeClass(color+"-pressed");
}, 200);
}

function playAudio(colorName){
  var audio= new Audio("sounds/" + colorName + ".mp3")
  audio.play();
}

function startOver(){
  lvl=0;
  answer=[];
  game=[];
}

function gameOver(){
  document.querySelector(".play-btn").id="";
  document.querySelector(".play-btn").innerHTML = "<h1>tap to play</h1>" ;

  document.querySelector(".blue").innerHTML = "<p>"+lvl+"</P>" ;
  $(".game p").fadeIn(1000);

  startOver();
  wrong.play();
}
