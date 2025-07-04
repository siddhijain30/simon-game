var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern =[];
var started = false;
var level = 0;
//detect keypress
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

//main function
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        console.log("success");
    
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);  
    }
}
    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNUmber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNUmber];
    //buttomColours[0] = red -> store in randomChosenColour;
    //buttomColours[1] = blue -> store in randomChosenColour;
    //buttomColours[2] = green -> store in randomChosenColour;
    //buttomColours[3] = yellow -> store in randomChosenColour;
    gamePattern.push(randomChosenColour);
    // gamePattern = [red ,blue, green, yellow]
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

//used to play sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//used to add animatation
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


//start over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }