class Ball {

  constructor(ctx, platform) {
    this.ctx = ctx;

    this.platform = platform;
    
    this.ballVelocity = 6;
    this.radius = 8;
    this.fillStyle = 'orange';
    this.strokeStyle = 'black';

    this.resetBall();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    this.x += this.dx * velocityScale;
    this.y += this.dy * velocityScale;

    if ((this.x > this.ctx.canvas.width - this.radius) || (this.x <= this.radius)) { 
      this.dx *= -1; 
    }

    if (this.y < this.radius) { 
      this.dy *= -1;
    } else if (this.y > (this.ctx.canvas.height - this.radius)) { 
      console.log('Lose');      
      this.resetBall();
    }    
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.stroke();
  }

  resetBall() {
    this.x = this.platform.x + (this.platform.width / 2);
    this.y = this.platform.y - 20;
    this.dx = this.ballVelocity;
    this.dy = -this.ballVelocity;
  }

  collideWithBrick(brick) {
    const brickY = (this.y + this.radius >= brick.pos.y) && (this.y - this.radius <= brick.pos.y + brick.size.height);
    const brickX = (this.x + this.radius >= brick.pos.x) && (this.x - this.radius <= brick.pos.x + brick.size.width);
    
    if (brickX && brickY) {
      this.dy *= -1;
      return true
    }
  }

  collideWithPlatform() {
    const platformY = (this.y + this.radius >= this.platform.y) && (this.y - this.radius <= this.platform.y);
    const platformX = (this.x + this.radius >= this.platform.x) && (this.x - this.radius <= this.platform.x + this.platform.width);

    if (platformY && platformX) {
      this.dy *= -1 * 1.1;
      this.dx *= Math.sqrt((1 + Math.cos(this.x - this.platform.x + (this.platform.width / 2))));
    }
  }
  
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = Ball;