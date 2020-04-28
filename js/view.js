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
    cir.id = "circle_" + ball.name;

    let gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    gradient.id = "gradient_" + ball.name;
    gradient.setAttribute("cx", "50%");
    gradient.setAttribute("cy", "50%");
    gradient.setAttribute("r", "50%");
    gradient.setAttribute("fx", "60%");
    gradient.setAttribute("fy", "40%");

    let gradientColor1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    gradientColor1.setAttribute("offset", "5%")
    gradientColor1.setAttribute("style", "stop-color:white");
    let gradientColor2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    gradientColor2.setAttribute("offset", "95%")
    gradientColor2.setAttribute("style", "stop-color:" + ball.color);
    gradientColor2.id = "gradientColor2_" + ball.name

    cir.setAttribute("fill", "url(#gradient_" + ball.name + ")");

    gradient.appendChild(gradientColor1);
    gradient.appendChild(gradientColor2);
    svg.appendChild(gradient);
    svg.appendChild(cir);
    document.body.appendChild(svg);
}

function redrawBall(ball) {
    let ballHTMLElement = document.getElementById(ball.name);
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

function redrawBallWithNewColor(ball, color) {
    let gradientColor2HTMLElement = document.getElementById("gradientColor2_mainBall");
    gradientColor2HTMLElement.setAttribute("style", "stop-color:" + color);
}

function viewInit() {
    drawBall(mainBall);
    littleBalls.forEach(item => {
        drawBall(item);
    });
}

