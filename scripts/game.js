const Platform = require('./platform');
const Ball = require('./ball');
const Brick = require('./brick');

class Game {
  constructor() {
    // this.platform = new Platform();
    // this.ball = new Ball();
    this.bricks = [];

    this.addBricks();
  }

  addBricks() {
    for (let i = 0; i < Game.BRICK_ROWS; i++){
      for (let i = 0; i < Game.BRICK_COLS; i++) {
        let pos = {x: 20, y: 50};
        this.bricks.push(new Brick(this, pos));
        
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.bricks.forEach((brick) => brick.draw(ctx));

  }

  step(delta) {
    // console.log(delta);
  }



}

Game.BG_COLOR = "#000000";
Game.DIM_X = window.innerWidth * 0.8;
Game.DIM_Y = window.innerHeight * 0.8;
Game.FPS = 32;

Game.BRICK_ROWS = 3;
Game.BRICK_COLS = 5;
Game.BRICK_GAP = 10;
Game.BRICK_SIZE = {
  width: (Game.DIM_X * 0.9),
  height: 15
}

module.exports = Game;