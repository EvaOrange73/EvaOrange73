function drawBall(ball) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", `${2 * ball.radius}`);
    svg.setAttribute("height", `${2 * ball.radius}`);
    svg.setAttribute("viewBox", "0 0 2 2");
    svg.id = ball.name;
    svg.style.transform = "translate(" + (ball.x - ball.radius) + "px," + (ball.y - ball.radius) + "px)";

    let cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("cx", "1");
    cir.setAttribute("cy", "1");
    cir.setAttribute("r", "1");
    cir.setAttribute("fill", ball.color);

    svg.appendChild(cir);
    document.body.appendChild(svg);
}

function redrawBall(ball) {
    console.log(ball.name)
    let ballHTMLElement = document.getElementById(ball.name);
    console.log(ballHTMLElement)
    if (ballHTMLElement != null) {
        ballHTMLElement.style.transform = "translate(" + (ball.x - ball.radius) + "px," + (ball.y - ball.radius) + "px)";
    }
}


function redrawBallsAfterEating(biggerBall, smallerBall) {
    let ballHTMLElement = document.getElementById(biggerBall.name);
    ballHTMLElement.setAttribute("width", `${2 * biggerBall.radius}`);
    ballHTMLElement.setAttribute("height", `${2 * biggerBall.radius}`);
    document.getElementById(smallerBall.name).remove();
}

function viewInit() {
    drawBall(mainBall);
    littleBalls.forEach(item => {
        drawBall(item);
    });
}

