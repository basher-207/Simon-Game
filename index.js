const AviableButtons = $(".color");

let gameIsStarted = false;
let playerIsAllowedToChoise = false;

let gameArr = [];
let playerArr = [];

//Hiding the hint
$("#Hint").hide();

// Starting the game
$(document).keypress((i)=>{
    if(i.key == "Enter" && gameIsStarted == false){
        gameIsStarted = true;

        // Game view
        $("h1, footer").slideUp();
        $("body").removeClass("game-over");

        // Animation
        setTimeout(() => {
            $("#main-section").removeClass(".hide");
            $("h1").removeClass("start-for-h1");
            $("h1").text("Lvl " + (gameArr.length + 1));
            $("h1").slideDown();
            $("#main-section").slideDown();
        }, 400);
        
        // Setting array to 0
        gameArr = [];

        setTimeout(() => {
            newLvl();
        }, 800);
    }
});

function newLvl() {
    // Setting player array to 0
    playerArr = [];

    // Editing h1 text to current lvl
    $("h1").text("Lvl " + (gameArr.length + 1));

    // Computer rselecting a random button
    setTimeout(() => {
        computerRandomChoise();
    }, 400);

    // Player get acces to click the buttons
    playerIsAllowedToChoise = true
    
    // Player is allowed to click "hint" button         
    if(gameArr.length >=3){
        // "Hint" button appear
        $("#Hint").fadeOut([1000]).fadeIn();
        hintClickEvent();
    };

    // Player is allowed to click one button
    if(playerIsAllowedToChoise == true){
        setTimeout(() => {
            userChoise();
        }, 200);
    };
};

function computerRandomChoise(){
    let randomNumber = Math.floor(Math.random()*4);

    // Adding name of the button to game array
    gameArr.push(AviableButtons[randomNumber].name);
    
    // Sound
    let sound = new Audio("sounds/" + AviableButtons[randomNumber].name + ".mp3");
    sound.play();

    // Animation
    $(".color[name='" + AviableButtons[randomNumber].name + "']").addClass("color-cl");
    setTimeout(() => {
        $(".color[name='" + AviableButtons[randomNumber].name + "']").removeClass("color-cl")
    }, 100);
};

async function hintClickEvent(){
    $("#Hint").click(()=>{
        // Disabling clicking on "hint" button
        $("#Hint").off("click");

        for(let i = 0; i < gameArr.length; i++){
            buttonClickingHint(i);
        };

        // Hide the "hint" button
        $("#Hint").fadeOut();
    });
};

function buttonClickingHint(i) {
    setTimeout(() => {
        $(".color[name='" + gameArr[i] + "']").fadeOut([200]);
        $(".color[name='" + gameArr[i] + "']").fadeIn([200]);
    }, 1500 * i);
};

function userChoise(){
    $(".color").click(function() {
        // Disabling clicking on "hint" button
        $("#Hint").off("click");
        // Hide the "hint" button
        $("#Hint").fadeOut();

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
    };
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
    };
}

function gameOver(){
    gameIsStarted = false;

    // Animation 
    $("h1, #main-section").slideUp();
    setTimeout(() => {
        $("h1").html("Game Over <br> Press Enter to restart");
        $("h1").addClass("start-for-h1").slideDown();
    }, 400);

    // Sound
    $("body").addClass("game-over");
    let sound = new Audio("sounds/wrong.mp3");
    sound.play();
};
