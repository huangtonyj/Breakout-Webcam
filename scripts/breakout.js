require('./ball.js')

const canvas = document.getElementById('canvasRoot');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = 1000;
canvas.height = 700;

const c = canvas.getContext('2d');

// Platform
const platformWidth = 150;
const platformHeight = 15;
let platformX = (canvas.width - platformWidth) / 2;
let platformY = (canvas.height - platformHeight - 15);

c.beginPath();
c.fillRect(platformX, platformY, platformWidth, platformHeight)


// Ball
const ballRadius = 10;
const velocity = 1;
let x = platformX;
let y = platformY;
let dx = velocity;
let dy = -velocity;

function animate () {
  requestAnimationFrame(animate);
  
  // clearing helper method!, dependent on speed
  // c.clearRect(0, 0, canvas.width, canvas.height)
  c.clearRect(x - 15, y - 15, ballRadius * 3, ballRadius * 3)
  
  c.beginPath();
  c.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  c.strokeStyle = 'black'
  c.stroke();
  c.fillStyle = 'green';
  c.fill();

  x += dx;
  y += dy;

  if ((x > canvas.width - ballRadius) || (x < ballRadius)) {
    dx *= -1;
  }

  if ((y > canvas.height - ballRadius) || (y < ballRadius)) {
    dy *= -1;
  }

}

animate();