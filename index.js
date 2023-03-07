const AviableButtons = $(".color");

let gameIsStarted = false;
let playerIsAllowedToChoise = false;

let gameArr = [];
let playerArr = [];

//First page view
$("h1").addClass("start-for-h1");

// Starting the game
$(document).keypress((i)=>{
    if(i.key == "Enter" && gameIsStarted == false){

        // Game view
        $("h1").slideUp();
        $("body").removeClass("game-over");


        // Animation
        setTimeout(() => {
            $("#main-section, footer").removeClass(".hide");
            $("h1").removeClass("start-for-h1");
            $("h1").text("Lvl " + (gameArr.length + 1));
            $("h1").slideDown();
            $("#main-section, footer").slideDown();
        }, 400);
        
        // Setting array to 0
        gameArr = [];

        setTimeout(() => {
            newLvl();
        }, 800);
        
    }
});

async function newLvl() {
    // Setting player array to 0
    playerArr = [];

    // Editing h1 text to current lvl
    $("h1").text("Lvl " + (gameArr.length + 1));

    // Computer rselecting a random button
    await computerRandomChoise();

    // Player is allowed to click one button
    if(playerIsAllowedToChoise == true){
        setTimeout(() => {
            userChoise();
        }, 200);
    }
    
}

function computerRandomChoise(){
    let randomNumber = Math.floor(Math.random()*4);

    // Adding name of the button to game array
    gameArr.push(AviableButtons[randomNumber].name);
    
    setTimeout(() => {
        // Sound
        let sound = new Audio("sounds/" + AviableButtons[randomNumber].name + ".mp3");
        sound.play();

        // Animation
        setTimeout(() => {
            $(".color[name='" + AviableButtons[randomNumber].name + "']").addClass("color-cl");
        setTimeout(() => {
            $(".color[name='" + AviableButtons[randomNumber].name + "']").removeClass("color-cl")
        }, 100);
        }, 400);
        
    }, 400);
    
    
    // Player get acces to click the buttons
    playerIsAllowedToChoise = true;
}

function userChoise(){
    $(".color").click(function() {

        // Disabling user clicking
        $(".color").off("click");

        //Editing an array
        playerArr.push($(this).attr("name"));
    
        // Playing sound
        let sound = new Audio("sounds/" + $(this).attr("name") + ".mp3");
        sound.play();
    
        // Animation
        $(this).addClass("color-cl");
        setTimeout(() => {
            $(this).removeClass("color-cl")
        }, 100);

        // Reviewing right answer
        setTimeout(() => {
            reviewLastChoise();
        }, 100);
    });
}

function reviewLastChoise(){
    // Review if answers are matching (if yes continue to reviewing length of arrays else gameOver)
    if(playerArr[(playerArr.length - 1)] == gameArr[(playerArr.length - 1)]){
        lengthReview();
    }else{
        gameOver();
    }
}

function lengthReview() {
    // If player pressed enough number of buttons then he goes to next lvl, else he is allowed to click one more time
    if(playerArr.length == gameArr.length){
        setTimeout(() => {
            newLvl();
        }, 700);
    }else{
        playerIsAllowedToChoise = true;
        userChoise();
    }
}

function gameOver(){
    gameIsStarted = false;

    // Animation 
    $("h1, #main-section, footer").slideUp();
    setTimeout(() => {
        $("h1").html("Game Over <br> Press Enter to restart");
        $("h1").addClass("start-for-h1").slideDown();
    }, 400);

    // Sound
    $("body").addClass("game-over");
    let sound = new Audio("sounds/wrong.mp3");
    sound.play();

}
