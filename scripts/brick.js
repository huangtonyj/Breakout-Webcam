class Brick {

  constructor(game, size, pos) {
    this.game = game;
    this.size = size;
    this.pos = pos;

    this.color = 'white'; // Random color palette later
  }

  draw() {
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
  }

}

module.exports = Brick;