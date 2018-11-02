const Platform = require('./platform');
const Ball = require('./ball');
const Brick = require('./brick');

class Game {
  
  constructor(ctx) {
    this.ctx = ctx;
    this.platform = new Platform(ctx);
    this.ball = new Ball(ctx, this.platform);
    this.bricks = [];

    this.addBricks();    
    // Refactor TF webcam into class and pass this.platform to it.
  }

  addBricks() {
    const pos = {
      x: Game.DIM_X * 0.05,
      y: Game.BRICK_SIZE.height
    }

    for (let i = 0; i < Game.BRICK_POS.rows; i++) {
      for (let i = 0; i < Game.BRICK_POS.cols; i++) {
        this.bricks.push(new Brick(this, Game.BRICK_SIZE, Object.assign({}, pos)));
        pos.x += Game.BRICK_POS.gap + Game.BRICK_SIZE.width;
      }
      pos.x = Game.DIM_X * 0.05,
      pos.y += Game.BRICK_SIZE.height * 2;
    }    
  }

  draw(ctx) {    
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.bricks.forEach((brick) => brick.draw());
    this.platform.draw();
    this.ball.draw();
  }

  checkCollisions() {
    this.ball.collideWithPlatform();

    this.bricks.forEach((brick, idx) => {
      if (this.ball.collideWithBrick(brick)) {
        this.bricks.splice(idx, 1);
      }
    })
  }

  step(timeDelta) {
    this.ball.move(timeDelta);

    this.checkCollisions();
  }

}

Game.BG_COLOR = "#000000";
Game.DIM_X = window.innerWidth * 0.8;
Game.DIM_Y = window.innerHeight * 0.8;
Game.FPS = 32;

Game.BRICK_POS = {
  rows: 5,
  cols: 7,
  gap: 10
}

Game.BRICK_SIZE = {
  width: ((Game.DIM_X * 0.9) - ((Game.BRICK_POS.cols - 1) * Game.BRICK_POS.gap)) / Game.BRICK_POS.cols,
  height: 25
}

module.exports = Game;