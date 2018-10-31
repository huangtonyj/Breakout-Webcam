const Ball = require('./ball');

const canvas = document.getElementById('canvasRoot');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = 1000;
canvas.height = 700;

const canvasContext = canvas.getContext('2d');

// Platform
const platformWidth = 150;
const platformHeight = 15;
let platformX = (canvas.width - platformWidth) / 2;
let platformY = (canvas.height - platformHeight - 15);

canvasContext.beginPath();
canvasContext.fillRect(platformX, platformY, platformWidth, platformHeight)


// Ball
const ballRadius = 10;
const ballVelocity = 1;

const ball = new Ball({
  canvas: canvas,
  x: platformX + (platformWidth/2),
  y: platformY - platformHeight
})

function animate () {
  requestAnimationFrame(animate);

  ball.update();

}

animate();