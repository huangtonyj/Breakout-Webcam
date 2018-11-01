class Platform {
  constructor() {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.width = 100;
    this.height = 15;
    this.fillStyle = 'black';

    this.x_i = (this.canvas.width - this.width) / 2;
    this.y_i = (this.canvas.height - this.height) - 15;
    this.x = this.x_i;
    this.y = this.y_i;

    this.x_mid = this.x + (this.width / 2);
    this.y_top = this.y;
  }

  render(rightPressed, leftPressed) {
    this.draw();
    if (rightPressed) {this.move(1)}
    if (leftPressed) {this.move(-1)}
  }

  move(dx) {
    this.x += dx;
    console.log('moved');
  }

  draw() {
     this.context.beginPath();

     this.context.fillStyle = this.fillStyle;
     this.context.fill();
     this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

module.exports = Platform;