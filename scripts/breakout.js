const Ball = require('./ball');
const Platform = require('./platform');

const canvas = document.getElementById('canvasRoot');
  canvas.width = window.innerWidth * 0.8;
  canvas.height = (window.innerHeight) * 0.8;

// Platform
const platformWidth = 150;
const platformHeight = 15;
const platformX = (canvas.width - platformWidth) / 2;
const platformY = (canvas.height - platformHeight - 15);



const platform = new Platform(canvas)


// Ball
// const ball = new Ball(canvas, {
//     x_i: platformX + (platformWidth/2), // Ball starts right above platform
//     y_i: platformY - platformHeight
//   })

const ball = new Ball(canvas, platform)


// Animate
function animate () {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate);

  platform.update();
  ball.update();
}

animate();