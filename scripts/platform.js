class Platform {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.width = 150;
    this.height = 15;
    this.fillStyle = 'black';

    this.x_i = (this.canvas.width - this.width) / 2;
    this.y_i = (this.canvas.height - this.height) - 15;
    this.x = this.x_i;
    this.y = this.y_i;

    this.x_mid = this.x + (this.width / 2);
    this.y_top = this.y;
  }

  update() {
    // this.clearPlatformPath();

    this.context.beginPath();

    this.context.fillStyle = this.fillStyle;
    this.context.fill();
    this.context.fillRect(this.x, this.y, this.width, this.height);

    this.x -= 3;

    if(this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width
    } else if (this.x <= 0) {
      this.x = 0
    }
    this.x_mid = this.x + (this.width / 2);
  }

  clearPlatformPath() {
    this.context.clearRect(this.x - 1, this.y, this.width + 2, this.height)
  }
}

module.exports = Platform;