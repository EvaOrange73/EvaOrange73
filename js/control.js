let mx, my;

function calculateDistanceToCursor(x, y) {
    return Math.sqrt((mx - x) ** 2 + (my - y) ** 2);
}

function calculateAlphaToCursor(x, y) {
    return calculateAlpha(x, y, mx, my);
}

function changeBall(ball, dt) {
    let distance = calculateDistanceToCursor(ball.x, ball.y);
    let alpha = calculateAlphaToCursor(ball.x, ball.y);
    moveBall(ball, distance, alpha, dt);
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

    let t0 = performance.now();
    requestAnimationFrame(function f() {
        let dt = performance.now() - t0;
        // console.log(String(dt));
        t0 = performance.now();
        changeBall(mainBall, dt);
        for (let i = 0; i < numberOfLittleBalls; i++) {
            changeBall(littleBalls[i], dt);
        }
        requestAnimationFrame(f);
    });
}