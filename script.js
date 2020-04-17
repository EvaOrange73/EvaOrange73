function drawBall(ball) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", `${2 * ball.radius}`);
    svg.setAttribute("height", `${2 * ball.radius}`);
    svg.id = ball.name;
    svg.style.transform = "translate(" + ball.x + "px," + ball.y + "px)";

    let cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("cx", ball.radius);
    cir.setAttribute("cy", ball.radius);
    cir.setAttribute("r", ball.radius);
    cir.setAttribute("fill", ball.color);

    svg.appendChild(cir);
    document.body.appendChild(svg);
}

function generateRandomColor() {
    let byte = () => Math.floor(Math.random() * 255);
    return `rgb(${byte()}, ${byte()}, ${byte()}`;
}

function generateRandomLittleBall(i) {
    return {
        name: String(i),
        color: generateRandomColor(),
        radius: 5 + Math.random() * 10,
        speed: 1 + Math.random() * 2,
        alpha: Math.random() * 2 * Math.PI,
        x: Math.random() * bodyCoords.right,
        y: Math.random() * bodyCoords.bottom
    };
}

function calculateDistanceToCursor(ball) {
    return Math.sqrt((mx - (ball.x + 50)) ** 2 + (my - (ball.y + 50)) ** 2);
}

function changeSpeed(ball) {
    let distance = calculateDistanceToCursor(ball);

    if (distance > 100) {
        ball.speed = V;
    } else if (distance > 40) {
        ball.speed = distance * V / 100;
    } else {
        ball.speed = 0;

    }
}

function moveBall(ball) {
    if (ball == mainBall) {
        changeSpeed(ball);
        ball.alpha = calculateAlpha(ball.x, ball.y, ball.radius, mx, my);
    } else {
        if (ball.x + 2 * ball.radius >= bodyCoords.right) {
            ball.alpha = Math.PI - ball.alpha;
        } else if (ball.x <= 0) {
            ball.alpha = Math.PI - ball.alpha;
        } else if (ball.y + 2 * ball.radius >= bodyCoords.bottom) {
            ball.alpha = -ball.alpha;
        } else if (ball.y <= 0) {
            ball.alpha = -ball.alpha;
        }
    }

    ball.x = Math.min(bodyCoords.right - ball.radius * 2,
        Math.max(0, ball.x + ball.speed * Math.cos(ball.alpha)));

    ball.y = Math.min(bodyCoords.bottom - ball.radius * 2,
        Math.max(0, ball.y + ball.speed * Math.sin(ball.alpha)));

    let ballHTMLElement = document.getElementById(ball.name);
    ballHTMLElement.style.transform = "translate(" + ball.x + "px," + ball.y + "px)";
}

function calculateAlpha(x, y, r, mx, my) {
    let dx = mx - x - r;
    let dy = my - y - r;

    alpha = Math.atan(dy / dx);
    if (dx < 0) {
        return Math.PI + alpha;
    }
    return alpha;
}


//TODO start script when window is loaded
let bodyCoords = document.body.getBoundingClientRect();
window.onload = e => bodyCoords = document.body.getBoundingClientRect();
window.onresize = e => bodyCoords = document.body.getBoundingClientRect();

//Константы для большого шарика
let BALL_R = 50;
let V = 7;
let BALL_X = bodyCoords.right / 2 - BALL_R;
let BALL_Y = bodyCoords.bottom / 2 - BALL_R;

//Изначальная позиция мышки
let mx = bodyCoords.right / 2 + 1;
let my = bodyCoords.bottom / 2 + 1;

//Количество маленьких шариков
let k = 100;

document.onmousemove = (e) => {
    mx = e.clientX;
    my = e.clientY;
};

let mainBall = {
    name: "mainBall",
    radius: BALL_R,
    color: "black",
    speed: V,
    alpha: 0,
    x: BALL_X,
    y: BALL_Y
};

drawBall(mainBall);


let littleBalls = [];
for (let i = 0; i < k; i++) {
    littleBalls[i] = generateRandomLittleBall(i);
    drawBall(littleBalls[i]);
}

requestAnimationFrame(function f() {
    moveBall(mainBall);
    for (let i = 0; i < k; i++) {
        moveBall(littleBalls[i]);
    };
    requestAnimationFrame(f);
});

