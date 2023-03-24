const buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
// to keep track whether game has started or not
var started = false;
var level = 0;

// Detect key press and call the next sequence on the first keypress
$(document).keypress(function(){
   if (!started) {
      $("#level-title").text('Level ' + level);
      nextSequence();
      started = true;
   }
});

// select button class (since all buttons have the same class)
// get the id of the button clicked(the colour) and add to userClickedPattern
$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);

   // pass index of last answer in the user's sequence
   checkAnswer(userClickedPattern.length - 1);
});

// function creates a new pattern by generating random numbers between 0-3\
// used to get a random  colour from the colors array
function nextSequence(){
   // reset userClickedPattern for next level
   userClickedPattern = [];

   // increase the level anytime this function is called
   level ++;

   $("#level-title").text('Level ' + level);

   var randomNumber  = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   // select button with the same id as the randomChosenColour and animate a flash
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

// play sound when a button is clicked
function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

// add pressed style to the button clicked for few microseconds
function animatePress(currentColour) {
   $('#' + currentColour).addClass("pressed");
   setTimeout(function() {
      $('#' + currentColour).removeClass('pressed');
   }, 100);

}

// checks whether gamePattern is the same as the userPattern  at the current level
function checkAnswer(currentLevel) {
   // check if most recent answer is the same as game pattern
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      // check if sequence is completed, call nextSequence afte4r 1000 millisecond delay
      if (userClickedPattern.length === gamePattern.length) {
         setTimeout(function() {
            nextSequence();
         }, 1000);
      }
   }
   else {
      console.log("wrong");
      playSound("wrong")
      $("body").addClass("game-over");

      setTimeout(function(){
         $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
   }
}

// play the game
var gameOver = false;
function playGame(){
   console.log(userClickedPattern);
   console.log(gamePattern);
   if (gamePattern === userClickedPattern){
      nextSequence();
   } else {
      alert("Game Over");
   }
}

// reset all variables
function startOver() {
   level = 0;
   gamePattern = [];
   started = false;
}
