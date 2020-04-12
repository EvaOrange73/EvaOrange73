function moveBall(){

    let bodyCoords = document.body.getBoundingClientRect();
    let ballCoords = ball.getBoundingClientRect();

    let bx = ballCoords.left;
    let by = ballCoords.top;

    document.addEventListener('mousemove', changeAngle, false);
    console.log(`${alpha}`)

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

function changeAngle(e) {
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

let ball = document.getElementById("ball");
let alpha = 0;
let v = 5;

setInterval(moveBall, 40);

