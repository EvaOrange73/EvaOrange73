let mx, my;

function calculateDistanceToCursor(x, y) {
    return Math.sqrt((mx - x) ** 2 + (my - y) ** 2);
}

function calculateAlphaToCursor(x, y) {
    return calculateAlpha(x, y, mx, my);
}

function changeBall(ball) {
    let distance = calculateDistanceToCursor(ball.x, ball.y);
    let alpha = calculateAlphaToCursor(ball.x, ball.y);
    moveBall(ball, distance, alpha);
    redrawBall(ball);
}

function controlInit() {
    //Изначальная позиция мышки
    mx = bodyCoords.right / 2 + 1;
    my = bodyCoords.bottom / 2 + 1;
    document.onmousemove = (e) => {
        mx = e.clientX;
        my = e.clientY;
    };

    requestAnimationFrame(function f() {
        changeBall(mainBall);
        for (let i = 0; i < numberOfLittleBalls; i++) {
            changeBall(littleBalls[i]);
        }
        requestAnimationFrame(f);
    });
}