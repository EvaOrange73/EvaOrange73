let mx, my;

function calculateDistanceToCursor(x, y) {
    return calculateDistanceByCoords(x, y, mx, my);
}

function calculateAlphaToCursor(x, y) {
    return calculateAlpha(x, y, mx, my);
}

function changeBallPosition(ball, dt) {
    let distance = calculateDistanceToCursor(ball.x, ball.y);
    let alpha = calculateAlphaToCursor(ball.x, ball.y);
    moveBall(ball, distance, alpha, dt);
}

function controlInit() {
    //Изначальная позиция мышки
    mx = bodyCoords.right / 2 + 1;
    my = bodyCoords.bottom / 2 + 1;
    document.onmousemove = (e) => {
        mx = e.clientX;
        my = e.clientY;
    };

    let currentTime = performance.now();
    requestAnimationFrame(function f() {

        let dt = performance.now() - currentTime;
        if(dt >= 1000){
            dt = 1000
        }
        currentTime = performance.now();
        changeBallPosition(mainBall, dt);

        littleBalls.forEach(ball => {
           changeBallPosition(ball, dt);
        });

        littleBalls.forEach((ball, index) => {
            if(calculateDistanceByCoords(ball.x,  ball.y, mainBall.x, mainBall.y) <= mainBall.radius){
                eatBall(mainBall, ball, index);
            }
        });

        requestAnimationFrame(f);
    });
}