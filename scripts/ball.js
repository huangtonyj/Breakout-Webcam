class Ball {
  constructor(canvas, platform) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.platform = platform;
    
    this.ballVelocity = 3;
    this.ballRadius = 8;
    this.fillStyle = 'orange';
    this.strokeStyle = 'black';

    this.resetBall();
  }

  update() {
    // this.clearBallPath();

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);

    this.context.fillStyle = this.fillStyle;
    this.context.fill();
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();

    this.x += this.dx;
    this.y += this.dy;

    if ((this.x > this.canvas.width - this.ballRadius) || (this.x <= this.ballRadius)) { 
      this.dx *= -1; 
    }

    if (this.y < this.ballRadius) { 
      this.dy *= -1;
    } else if (this.y > (this.canvas.height - this.ballRadius)) { 
      this.resetBall();
    }    
  }

  resetBall() {
    this.x = this.platform.x_mid;
    this.y = this.platform.y_top;
    this.dx = this.ballVelocity;
    this.dy = -this.ballVelocity;
  }

  clearBallPath() {
    // Need a more elaborate algo
    this.context.clearRect(this.x - 15, this.y - 15, this.ballRadius * 3, this.ballRadius * 3)
  }

}

module.exports = Ball;