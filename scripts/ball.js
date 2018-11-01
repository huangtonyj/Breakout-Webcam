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
    this.draw();

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

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);

    this.context.fillStyle = this.fillStyle;
    this.context.fill();
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();
  }

  resetBall() {
    this.x = this.platform.x_mid;
    this.y = this.platform.y_top;
    this.dx = this.ballVelocity;
    this.dy = -this.ballVelocity;
  }

}

module.exports = Ball;