class Platform {

  constructor(ctx) {    
    this.ctx = ctx

    this.width = 100;
    this.height = 15;
    this.fillStyle = 'white';

    this.x_i = (ctx.canvas.width - this.width) / 2;
    this.y_i = (ctx.canvas.height - this.height) - 15;
    this.x = this.x_i;
    this.y = this.y_i;

    this.x_mid = this.x + (this.width / 2);
    this.y_top = this.y;

    this.velocity = 15;

    this.handleMove()
  }

  handleMove() {
    document.addEventListener('keydown', (e) => {
      if ((e.key === "ArrowLeft") && (this.x > 0)) {
        this.x -= this.velocity;
      } else if ((e.key === "ArrowRight") && (this.x < this.ctx.canvas.width - this.width)) {
        this.x += this.velocity;
      }
    })
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