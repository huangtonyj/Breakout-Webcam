require('./ball.js')

const canvas = document.getElementById('canvasRoot');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = 1000;
canvas.height = 700;

const c = canvas.getContext('2d');

// Platform
// const platformWidth = 150;
// const platformHeight = 15;
// let platformX = (canvas.width - platformWidth) / 2;
// let platformY = (canvas.height - platformHeight - 15);

// c.fillRect(platformX, platformY, platformWidth, platformHeight)


// Ball
const ballRadius = 10;
let x = 900;
let dx = 5;

function animate () {
  requestAnimationFrame(animate);
  
  c.clearRect(0, 0, canvas.width, canvas.height)
  
  c.beginPath();
  c.arc(x, 50, ballRadius, 0, Math.PI * 2, false);
  c.strokeStyle = 'black'
  c.stroke();
  c.fillStyle = 'red';
  c.fill();

  x += dx;

  if ((x > canvas.width - ballRadius) || (x < ballRadius)) {
    dx *= -1;
  }



}

animate();