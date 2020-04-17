var gamepattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

$(".btnPlay").click(function(){
  if(level === 0){
    nextSequence();
    $(".btnPlay").hide();
  }
});

function nextSequence(){
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamepattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var fileName = "sounds/"+randomChosenColour+".mp3"
  playSound(fileName);
  animatePress(randomChosenColour);
  userClickedPattern = [];
  console.log(gamepattern);
}

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  var fileName = "sounds/"+userChosenColour+".mp3"
  playSound(fileName);
  animatePress(userChosenColour);
  if(gamepattern.length === userClickedPattern.length){
    checkAnswer(level);
  }
  console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
  var lastClicked = userClickedPattern[userClickedPattern.length-1];
  var lastGamepattern = gamepattern[gamepattern.length-1];
  console.log("lastClicked = "+lastClicked);
  console.log("lastGamepattern = "+lastGamepattern);
  //most recent check
  if(lastClicked === lastGamepattern){
    if(checkEntireSequence()){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    else{
      gameOver();
    }
    // call another method
  }
  else{
    gameOver();
  }
}

function gameOver(){
  $("h1").html("<p>Game Over 😈! </p><p>Your high score :"+level+"</p>");
  console.log("wrong");
  playSound("sounds/wrong.mp3");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  startOver();
}

function startOver(){
  level = 0;
  gamepattern = [];
  $(".btnPlay").show();
}

function checkEntireSequence(){
  for(var i=0; i<gamepattern.length-1; i++){
    if(gamepattern[i] === userClickedPattern[i]){
      console.log("success");
    }
    else{
      return false;
    }
  }
  return true;
}

function playSound(fileName){
  var audio = new Audio(fileName);
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
