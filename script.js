let ball = document.getElementById("ball");

document.addEventListener('mousemove', moveBall, false);

function moveBall(e){

    let bodyCoords = document.body.getBoundingClientRect();
    let ballCoords = ball.getBoundingClientRect();

    let bx = ballCoords.left;
    let by = ballCoords.top;

    let mx = e.clientX;
    let my = e.clientY;

    let dx = mx - bx - 50;
    let dy = my - by - 50;

    let alpha = Math.atan(dy/dx);
    if (dx < 0){
        alpha = Math.PI + alpha;
    }

    let R = Math.sqrt(dx**2 + dy**2)
    let v = 3;
    if (R <= 600){
        v -= R / 200;
    }

    bx += v * Math.cos(alpha);
    by += v * Math.sin(alpha);

    if (ballCoords.right >= bodyCoords.right || ballCoords.left <= 0) {
        bx = 1;
    } else if(ballCoords.bottom >= bodyCoords.bottom || ballCoords.top <= 0){
        by = 1;
    }
    ball.style.left = `${bx}px`;
    ball.style.top = `${by}px`;

}

