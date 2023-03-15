const buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []


// function creates a new pattern by generating random numbers between 0-3\
// used to get a random  colour from the colors array
function nextSequence(){
   var randomNumber  = Math.floor(Math.random() * 4)
   var randomChosenColour = buttonColours[randomNumber]
   gamePattern.push(randomChosenColour)

   // select button with the same id as the randomChosenColour and animate a flash
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   // play audio of the button
   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
   audio.play();
}
 nextSequence();