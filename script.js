function  newBall(radius, color, name, x, y){
    let svg = document. createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 2 * radius );
    svg.setAttribute("height", 2 * radius);
    svg.setAttribute("style", "position:absolute");
    svg.setAttribute("id", name);

    svg.style.left = x + "px";
    svg.style.top = y + "px";

    let cir = document. createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("cx", radius);
    cir.setAttribute("cy", radius);
    cir.setAttribute("r", radius);
    cir.setAttribute("fill", color);

    svg.appendChild(cir);
    document.body.appendChild(svg);

};

function params() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

    radius = 5 + Math.random() * 10;

    speed = 1 + Math.random() * 5;
    beta = Math.random() * 2*Math.PI

    let bodyCoords = document.body.getBoundingClientRect();
    x = Math.random() * bodyCoords.right;
    y = Math.random() * bodyCoords.bottom;

}


function moveBall(name){
    let ball = document.getElementById(name);

    let bodyCoords = document.body.getBoundingClientRect();
    let ballCoords = ball.getBoundingClientRect();

    let bx = ballCoords.left;
    let by = ballCoords.top;

    document.addEventListener('mousemove', function g(e){changeAngle(e, name)}, false);

    bx += v * Math.cos(alpha);
    by += v * Math.sin(alpha);

    if (ballCoords.right >= bodyCoords.right){
        bx = bodyCoords.right - 101;
    } else if (ballCoords.left <= 0) {
        bx = 1;
    } else if (ballCoords.bottom >= bodyCoords.bottom){
        by = bodyCoords.bottom - 101;
    } else if (ballCoords.top <= 0){
        by = 1;
    }

    ball.style.left = `${bx}px`;
    ball.style.top = `${by}px`;

}

function changeAngle(e, name) {
    let ball = document.getElementById(name);
    let ballCoords = ball.getBoundingClientRect();

    let bx = ballCoords.left;
    let by = ballCoords.top;

    let mx = e.clientX;
    let my = e.clientY;

    let dx = mx - bx - 50;
    let dy = my - by - 50;

    alpha = Math.atan(dy/dx);
    if (dx < 0){
        alpha = Math.PI + alpha;
    }

    return alpha;

}


function moveSVG(speed, name){
    let svg = document.getElementById(name)

    let bodyCoords = document.body.getBoundingClientRect();
    let svgCoords = svg.getBoundingClientRect();

    x += speed * Math.cos(beta);
    y += speed * Math.sin(beta);

    if (svgCoords.right >= bodyCoords.right){
        x = bodyCoords.right - (2*radius + 1);
        beta = Math.PI - beta;
    } else if (svgCoords.left <= 0) {
        beta = Math.PI - beta;
        x = 1;
    } else if (svgCoords.bottom >= bodyCoords.bottom){
        y = bodyCoords.bottom - (2*radius + 1);
        beta = -beta;
    } else if (svgCoords.top <= 0){
        y = 10;
        beta = -beta;
    }

    svg.style.left = `${x}px`;
    svg.style.top = `${y}px`;
}


let mainBall = "mainBall";
// let ball = document.getElementById("ball");
let alpha = 0;
let v = 5;
let BALL_X = 100;
let BALL_Y = 100;


newBall(50, "black", mainBall, BALL_X, BALL_Y);
setInterval(function fun(){moveBall(mainBall)}, 40);


let littleBall = "littleBall";
let color;
let radius;
let x;
let y;
let speed;
let beta;

params();
newBall(radius, color, littleBall, x, y);
setInterval( function f(){moveSVG(speed, littleBall)}, 40);