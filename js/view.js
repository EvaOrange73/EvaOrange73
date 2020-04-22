function drawBall(ball) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", `${2 * ball.radius}`);
    svg.setAttribute("height", `${2 * ball.radius}`);
    svg.id = ball.name;
    svg.style.transform = "translate(" + (ball.x - ball.radius) + "px," + (ball.y - ball.radius) + "px)";

    let cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("cx", ball.radius);
    cir.setAttribute("cy", ball.radius);
    cir.setAttribute("r", ball.radius);
    cir.setAttribute("fill", ball.color);

    svg.appendChild(cir);
    document.body.appendChild(svg);
}

function redrawBall(ball) {
    let ballHTMLElement = document.getElementById(ball.name);
    if (ballHTMLElement != null) {
        ballHTMLElement.style.transform = "translate(" + (ball.x - ball.radius) + "px," + (ball.y - ball.radius) + "px)";
    }
}


function redrawBallWithNewRadius(biggerBall, smallRadius){
    let ballHTMLElement = document.getElementById(biggerBall.name);
    ballHTMLElement.style.transform = "scale(" + biggerBall.radius/ (biggerBall.radius - smallRadius) + ")";

}

function viewInit() {
    drawBall(mainBall);

    littleBalls.forEach(item => {
        drawBall(item);
    });
}

