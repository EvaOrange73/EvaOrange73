let x = 50;
let y = 50;
let v = 1;
let alpha = 0.9;
let ball = document.getElementById("ball");
let dx = 0;
let dy = 0;


document.addEventListener('mousemove', moveBall, false);

function moveBall(e){
    ball.style.left = `${x}%`;
    ball.style.top = `${y}%`;

    let mx = e.clientX;
    let my = e.clientY;
    //console.log(`${mx} + ${my}`); 
    let dx = mx - x;
    let dy = my - y;
    alpha = Math.atan(dy/dx);

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




