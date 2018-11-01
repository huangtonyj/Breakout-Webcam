class Ball {
  constructor(ctx, platform) {
    this.ctx = ctx;

    this.platform = platform;
    
    this.ballVelocity = 3;
    this.ballRadius = 8;
    this.fillStyle = 'orange';
    this.strokeStyle = 'black';

    this.resetBall();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    this.x += this.dx * velocityScale;
    this.y += this.dy * velocityScale;

    if ((this.x > this.ctx.canvas.width - this.ballRadius) || (this.x <= this.ballRadius)) { 
      this.dx *= -1; 
    }

    if (this.y < this.ballRadius) { 
      this.dy *= -1;
    } else if (this.y > (this.ctx.canvas.height - this.ballRadius)) { 
      console.log('Lose');      
      this.resetBall();
    }    
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);

    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.stroke();
  }

  resetBall() {
    this.x = this.platform.x_mid;
    this.y = this.platform.y_top;
    this.dx = this.ballVelocity;
    this.dy = -this.ballVelocity;
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = Ball;