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
    const leftGlow = document.getElementById('sideglow-left');
    const rightGLow = document.getElementById('sideglow-right');
   
    if ((dir === "ArrowLeft") && (this.x > 0)) {
      leftGlow.style.boxShadow = "0px 0px 50px 20px rgba(0, 128, 0, 0.5)";
      this.x -= this.velocity;
      setTimeout(() => leftGlow.style.boxShadow = '', 750);

    } else if ((dir === "ArrowRight") && (this.x < this.ctx.canvas.width - this.width)) {
      rightGLow.style.boxShadow = "0px 0px 50px 20px rgba(0, 128, 0, 0.5)";
      this.x += this.velocity;
      setTimeout(() => rightGLow.style.boxShadow = '', 750);
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