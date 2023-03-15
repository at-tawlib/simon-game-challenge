const buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

// select button class (since all buttons have the same class)
// get the id of the button clicked(the colour) and add to userClickedPattern
$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
});

// function creates a new pattern by generating random numbers between 0-3\
// used to get a random  colour from the colors array
function nextSequence(){
   var randomNumber  = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   // select button with the same id as the randomChosenColour and animate a flash
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   // play audio of the button
   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
   audio.play();
}