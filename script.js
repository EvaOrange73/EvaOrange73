function newBall(radius, color, name, x, y) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 2 * radius);
    svg.setAttribute("height", 2 * radius);
    svg.setAttribute("style", "position:absolute");
    svg.setAttribute("id", name);

    svg.style.left = x + "px";
    svg.style.top = y + "px";

    let cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("cx", radius);
    cir.setAttribute("cy", radius);
    cir.setAttribute("r", radius);
    cir.setAttribute("fill", color);

    svg.appendChild(cir);
    document.body.appendChild(svg);

};

function params(i) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    array[i][1] = '#' + r.toString(16) + g.toString(16) + b.toString(16); //color

    array[i][0] = 5 + Math.random() * 10; //radius

    array[i][5] = 1 + Math.random() * 5; //speed
    array[i][6] = Math.random() * 2 * Math.PI //beta

    let bodyCoords = document.body.getBoundingClientRect();
    array[i][3] = Math.random() * bodyCoords.right; //x
    array[i][4] = Math.random() * bodyCoords.bottom; //y

}


function moveBall(name) {
    let ball = document.getElementById(name);

    let bodyCoords = document.body.getBoundingClientRect();
    let ballCoords = ball.getBoundingClientRect();

    let bx = ballCoords.left;
    let by = ballCoords.top;

    document.addEventListener('mousemove', function g(e) {
        changeAngle(e, name)
    }, false);

    bx += v * Math.cos(alpha);
    by += v * Math.sin(alpha);

    if (ballCoords.right >= bodyCoords.right) {
        bx = bodyCoords.right - 101;
    } else if (ballCoords.left <= 0) {
        bx = 1;
    } else if (ballCoords.bottom >= bodyCoords.bottom) {
        by = bodyCoords.bottom - 101;
    } else if (ballCoords.top <= 0) {
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

    alpha = Math.atan(dy / dx);
    if (dx < 0) {
        alpha = Math.PI + alpha;
    }

    return alpha;

}


function moveSVG(array) {
    let name = array[2];
    let svg = document.getElementById(name)
    let x = array[3];
    let y = array[4];
    let beta = array[6];
    let speed = array[5];
    let radius = array[0];

    let bodyCoords = document.body.getBoundingClientRect();
    let svgCoords = svg.getBoundingClientRect();

    x += speed * Math.cos(beta);
    y += speed * Math.sin(beta);

    if (svgCoords.right >= bodyCoords.right) {
        x = bodyCoords.right - (2 * radius + 1);
        array[6] = Math.PI - beta;
    } else if (svgCoords.left <= 0) {
        array[6] = Math.PI - beta;
        x = 1;
    } else if (svgCoords.bottom >= bodyCoords.bottom) {
        y = bodyCoords.bottom - (2 * radius + 1);
        array[6] = -beta;
    } else if (svgCoords.top <= 0) {
        y = 10;
        array[6] = -beta;
    }

    svg.style.left = `${x}px`;
    svg.style.top = `${y}px`;

    array[3] = x;
    array[4] = y;
}

//Движение большого шарика
let mainBall = "mainBall";
let alpha = 0;
let v = 7;
let BALL_X = 100;
let BALL_Y = 100;


newBall(50, "black", mainBall, BALL_X, BALL_Y);
setInterval(function fun() {
    moveBall(mainBall)
}, 40);


//Движение маленьких шариков
let array = [];
k = 239;

for (let i = 0; i < k; i++) {
    array[i] = []
    array[i][2] = String(i);
    params(i);

    newBall(array[i][0], array[i][1], array[i][2], array[i][3], array[i][4]);
}


setInterval(function f() {
    for (let i = 0; i < k; i++) {
        moveSVG(array[i]);
    }
}, 40);
