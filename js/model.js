let mainBall, littleBalls = [];

function generateRandomColor() {
    let byte = () => Math.floor(Math.random() * 255);
    return `rgb(${byte()}, ${byte()}, ${byte()}`;
}

function generateRandomLittleBall(i) {
    let radius = 5 + Math.random() * 10;
    return {
        name: String(i),
        isMainBall: false,
        color: generateRandomColor(),
        radius: radius,
        speed: 1 + Math.random() * 2,
        alpha: Math.random() * 2 * Math.PI,
        x: radius + Math.random() * (bodyCoords.right),
        y: radius + Math.random() * (bodyCoords.bottom),
    };
}

function calculateSpeed(distance) {
    if (distance > 100) {
        return V;
    } else if (distance > 40) {
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

function moveBall(ball, distance, alpha) {
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
        Math.max(0, ball.x + ball.speed * Math.cos(ball.alpha)));

    ball.y = Math.min(bodyCoords.bottom - ball.radius,
        Math.max(0, ball.y + ball.speed * Math.sin(ball.alpha)));
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
        y: BALL_Y
    };

    for (let i = 0; i < numberOfLittleBalls; i++) {
        littleBalls[i] = generateRandomLittleBall(i);
    }
}