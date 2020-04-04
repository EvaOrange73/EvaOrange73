let v = 1;
let alpha = 0;
let ball = document.getElementById("ball");

document.addEventListener('mousemove', moveBall, false);

function moveBall(e){

    let bodyCoords = document.body.getBoundingClientRect();
    let ballCoords = ball.getBoundingClientRect();

    let bx = ballCoords.lef;
    let by = ballCoords.top;

    let mx = e.clientX;
    let my = e.clientY;

    let dx = mx - bx - 50;
    let dy = my - by - 50;

    alpha = Math.atan(dy/dx);
    if (dx < 0){
        alpha = Math.PI + alpha;
    }

    if (ballCoords.right >= bodyCoords.right || ballCoords.left <= 0) {
        alpha = Math.PI - alpha;
    } else if(ballCoords.bottom >= bodyCoords.bottom || ballCoords.top <= 0){
        alpha = -alpha;
    }

    bx += v * Math.cos(alpha);
    by += v * Math.sin(alpha);

    ball.style.left = `${bx}px`;
    ball.style.top = `${by}px`;

}

