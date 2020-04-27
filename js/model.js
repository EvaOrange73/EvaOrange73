let mainBall, littleBalls = [];

function generateRandomColor() {
    let byte = () => Math.floor(Math.random() * 255);
    return `rgb(${byte()}, ${byte()}, ${byte()}`;
}

function calculateDistanceByCoords(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function generateRandomLittleBall(i) {
    let radius = MIN_RADIUS + Math.random() * MAX_RADIUS;
    return {
        name: String(i),
        isMainBall: false,
        color: generateRandomColor(),
        radius: radius,
        speed: MIN_SPEED + Math.random() * MAX_SPEED,
        alpha: Math.random() * MAX_ALPHA,
        x: radius + Math.random() * MAX_X,
        y: radius + Math.random() * MAX_Y,
    };
}

function calculateSpeed(distance) {
    if (distance > 50) {
        return V;
    } else if (distance > 10) {
        return distance * V / 100;
    } else {
        return 0;
    }
}

function calculateAlpha(x, y, toX, toY) {
    let dx = toX - x;
    let dy = toY - y;

    let alpha = Math.atan(dy / dx);
    if (dx < 0) {
        return Math.PI + alpha;
    }
    return alpha;
}

function moveBall(ball, distance, alpha, dt) {
    if (ball.isMainBall) {
        ball.speed = calculateSpeed(distance);
        ball.alpha = alpha;
    } else {
        if (ball.x + ball.radius >= bodyCoords.right || ball.x - ball.radius <= 0) {
            ball.alpha = Math.PI - ball.alpha;
        } else if (ball.y + ball.radius >= bodyCoords.bottom || ball.y - ball.radius <= 0) {
            ball.alpha = -ball.alpha;
        }
    }

    ball.x = Math.min(bodyCoords.right - ball.radius,
        Math.max(ball.radius, ball.x + ball.speed * dt * Math.cos(ball.alpha)));

    ball.y = Math.min(bodyCoords.bottom - ball.radius,
        Math.max(ball.radius, ball.y + ball.speed * dt * Math.sin(ball.alpha)));

    redrawBall(ball);
}

function eatBall(bigBall, smallBall, index) {
    littleBalls.splice(index, 1);
    bigBall.radius = Math.sqrt(bigBall.radius ** 2 + smallBall.radius ** 2);
    redrawBallsAfterEating(bigBall, smallBall);
}

function addNewBall(i) {
    let newBall = generateRandomLittleBall(i);
    littleBalls.splice(parseInt(newBall.name), 0, newBall);
    return newBall
}

function modelInit() {
    mainBall = {
        name: "mainBall",
        isMainBall: true,
        radius: BALL_R,
        color: "black",
        speed: V,
        alpha: 0,
        x: BALL_X,
        y: BALL_Y,
    };

    for (let i = 0; i < numberOfLittleBalls; i++) {
        littleBalls[i] = generateRandomLittleBall(i);
    }
}