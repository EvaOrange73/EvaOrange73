let bodyCoords;
let BALL_X, BALL_Y;

//Константы для большого шарика
let V = 3;
let BALL_R = 50;

//Количество маленьких шариков
let numberOfLittleBalls = 10;

window.onload = () => {
    bodyCoords = document.body.getBoundingClientRect();
    window.onresize = () => bodyCoords = document.body.getBoundingClientRect();

    BALL_X = bodyCoords.right / 2;
    BALL_Y = bodyCoords.bottom / 2;

    modelInit();
    viewInit();
    controlInit();
};