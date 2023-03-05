$(".color").click(function() {
    // Playing sound
    let sound = new Audio("sounds/" + $(this).attr("name") + ".mp3");
    sound.play();

    // Animation
    $(this).addClass("color-cl");
    setTimeout(() => {
        $(this).removeClass("color-cl")
    }, 100);
});

$(".hint").click(function() {
    // Sound
    let sound = new Audio("sounds/hint.mp3");
    sound.play();

    // Animation
    $(this).addClass("hint-cl");
    setTimeout(() => {
        $(this).removeClass("hint-cl");
    }, 100);
});

