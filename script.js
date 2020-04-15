function newBall(radius, color, name, x, y) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 2 * radius);
    svg.setAttribute("height", 2 * radius);
    svg.setAttribute("style", "position:absolute");
    svg.setAttribute("id", name);

    svg.style.transform = "translate(" + x + "px," + y + "px)";

    let cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("cx", radius);
    cir.setAttribute("cy", radius);
    cir.setAttribute("r", radius);
    cir.setAttribute("fill", color);

    svg.appendChild(cir);
    document.body.appendChild(svg);

};

function params(i) {
    littleBalls[i].name = String(i);

    littleBalls[i].color = '#' + Math.floor(Math.random() * 256 * 256 * 256).toString(16)

    littleBalls[i].radius = 5 + Math.random() * 10; //radius

    littleBalls[i].speed = 1 + Math.random() * 5; //speed
    littleBalls[i].beta = Math.random() * 2 * Math.PI //beta

    littleBalls[i].x = Math.random() * bodyCoords.right; //x
    littleBalls[i].y = Math.random() * bodyCoords.bottom; //y

}


function moveBall(name) {
    let ball = document.getElementById(name);

    let ballCoords = ball.getBoundingClientRect();

    let bx = ballCoords.left;
    let by = ballCoords.top;

    document.addEventListener('mousemove', function (e) {
        changeAlpha(e, name)
    }, false);

    let R = Math.sqrt((mx - (bx + 50)) ** 2 + (my - (by + 50)) ** 2)
    if (R > 100) {
        v = V;
    } else if (R > 40) {
        v = R * V / 100;
    } else {
        v = 0;
    }

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

    ball.style.transform = "translate(" + bx + "px," + by + "px)";

}

function changeAlpha(e, name) {
    let ball = document.getElementById(name);
    let ballCoords = ball.getBoundingClientRect();

    let bx = ballCoords.left;
    let by = ballCoords.top;

    mx = e.clientX;
    my = e.clientY;

    let dx = mx - bx - 50;
    let dy = my - by - 50;

    alpha = Math.atan(dy / dx);
    if (dx < 0) {
        alpha = Math.PI + alpha;
    }

    return alpha;

}


function moveLittleBalls(object, name, x, y, speed, beta, radius) {
    let svg = document.getElementById(name)

    x += speed * Math.cos(beta);
    y += speed * Math.sin(beta);

    if (x + 2 * radius >= bodyCoords.right) {
        x = bodyCoords.right - (2 * radius);
        object.beta = Math.PI - beta;
    } else if (x <= 0) {
        object.beta = Math.PI - beta;
        x = 0;
    } else if (y + 2 * radius >= bodyCoords.bottom) {
        y = bodyCoords.bottom - (2 * radius);
        object.beta = -beta;
    } else if (y <= 0) {
        y = 0;
        object.beta = -beta;
    }

    svg.style.transform = "translate(" + x + "px," + y + "px)";

    object.x = x;
    object.y = y;

}


let bodyCoords = document.body.getBoundingClientRect();
window.addEventListener('resize', function () {
    bodyCoords = document.body.getBoundingClientRect()
}, false);

//Движение большого шарика
let mainBall = "mainBall";
let alpha = 0;
let V = 7;
let BALL_X = 100;
let BALL_Y = 100;
let mx;
let my;


newBall(50, "black", mainBall, BALL_X, BALL_Y);
setInterval(function () {
    moveBall(mainBall)
}, 40);


//Движение маленьких шариков
let k = 1000;

let littleBalls = [];
for (let i = 0; i < k; i++) {

    littleBalls[i] = {};

    params(i);

    newBall(littleBalls[i].radius,
        littleBalls[i].color,
        littleBalls[i].name,
        littleBalls[i].x,
        littleBalls[i].y);
}


setInterval(function () {
    for (let i = 0; i < k; i++) {
        moveLittleBalls(littleBalls[i],
            littleBalls[i].name,
            littleBalls[i].x,
            littleBalls[i].y,
            littleBalls[i].speed,
            littleBalls[i].beta,
            littleBalls[i].radius);
    }
}, 40);
