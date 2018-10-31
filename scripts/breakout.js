const Ball = require('./ball');
const Platform = require('./platform');

// Canvas
const canvas = document.getElementById('canvasRoot');
  canvas.width = window.innerWidth * 0.8;
  canvas.height = (window.innerHeight) * 0.8;

// Platform
const platform = new Platform(canvas)

// Ball
const ball = new Ball(canvas, platform)


// Animate
function animate () {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate);

  platform.update();
  ball.update();
}

animate();