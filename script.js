let x = 50;
let y = 50;
let v = 1;
let alpha = 0.9;
let ball = document.getElementById("ball");


function mov() {
    ball.style.left = `${x}%`;
    ball.style.top = `${y}%`;
    let bodyCoords = document.body.getBoundingClientRect();
    let ballCoords = ball.getBoundingClientRect();
    if (ballCoords.right >= bodyCoords.right || x <= 0) {
        alpha = Math.PI - alpha;
    } else if(ballCoords.bottom >= bodyCoords.bottom || y <= 0){
        alpha = -alpha;
    }
    x += v * Math.cos(alpha);
    y += v * Math.sin(alpha);
}

setInterval(mov, 40);
