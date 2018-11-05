class Platform {

  constructor(ctx) {    
    this.ctx = ctx

    this.width = 150;
    this.height = 10;
    this.fillStyle = 'white';

    this.x = (ctx.canvas.width - this.width) / 2;
    this.y = (ctx.canvas.height - this.height) - 30;

    this.x_mid = this.x + (this.width / 2);

    this.velocity = 20;
  }

  handleMove(dir) {
    if ((dir === "ArrowLeft") && (this.x > 0)) {
      this.x -= this.velocity;
    } else if ((dir === "ArrowRight") && (this.x < this.ctx.canvas.width - this.width)) {
      this.x += this.velocity;
    }
  }

  draw() {
     this.ctx.beginPath();
     this.ctx.fillStyle = this.fillStyle;
     this.ctx.fill();
     this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = Platform;