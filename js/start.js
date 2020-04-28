let bodyCoords;

//Константы для большого шарика
let V = 2 / 20;
let BALL_R = 50;
let BALL_X, BALL_Y;
let color = ["black", "darkviolet", "darkblue", "blue", "green", "yellow", "orange", "red",];
let colorCounter = 0;

//Константы для маленьких шариков
let numberOfLittleBalls = 50;
let MIN_RADIUS = 5;
let MAX_RADIUS = 10;
let MIN_SPEED = 1 / 20;
let MAX_SPEED = 2 / 20;
let MAX_ALPHA = 2 * Math.PI;
let MAX_X;
let MAX_Y;

window.onload = () => {
    bodyCoords = document.body.getBoundingClientRect();
    window.onresize = () => bodyCoords = document.body.getBoundingClientRect();

    BALL_X = bodyCoords.right / 2;
    BALL_Y = bodyCoords.bottom / 2;

    MAX_X = bodyCoords.right;
    MAX_Y = bodyCoords.bottom;

    modelInit();
    viewInit();
    controlInit();
};