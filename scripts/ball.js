class Ball {
  constructor(options) {
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.x = options.x;
    this.y = options.y;

    this.ballVelocity = 3;

    this.dx = this.ballVelocity;
    this.dy = -this.ballVelocity;

    this.ballRadius = 10;
    this.fillStyle = 'green';
    this.strokeStyle = 'black';
  }

  update() {
    this.clearBallPath();

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);

    this.context.fillStyle = this.fillStyle;
    this.context.fill();
    
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();

    this.x += this.dx;
    this.y += this.dy;

    if ((this.x > this.canvas.width - this.ballRadius) || (this.x < this.ballRadius)) {
      this.dx *= -1;      
    }

    if ((this.y > this.canvas.height - this.ballRadius) || (this.y < this.ballRadius)) {
      this.dy *= -1;
    }
  }

  clearBallPath() {
    // Need a more elaborate algo
    this.context.clearRect(this.x - 15, this.y - 15, this.ballRadius * 3, this.ballRadius * 3)
  }

}

module.exports = Ball;