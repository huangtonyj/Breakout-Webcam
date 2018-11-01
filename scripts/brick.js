class Brick {

  constructor(game, pos) {
    this.game = game;
    this.color = 'white'; // Random color palette later

    this.width = 100;
    this.height = 15;

    this.pos = pos;
  }

  draw(ctx) {
    
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

}

module.exports = Brick;