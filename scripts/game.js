const Platform = require('./platform');
const Ball = require('./ball');
const Brick = require('./brick');
const TfWebcamControl = require('./tf_webcam_control/tf_webcam_control')

class Game {
  
  constructor(ctx) {
    this.ctx = ctx;
    this.platform = new Platform(ctx);
    this.ball = new Ball(ctx, this.platform);
    
    this.bricks = [];
    this.playGame = false;
    this.score = 0;

    this.addBricks();   
    this.listenForMovements();
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

  listenForMovements() {
    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowLeft':
          this.platform.handleMove('ArrowLeft');
          break;

        case 'ArrowRight':
          this.platform.handleMove('ArrowRight');
          break;

        case 'Space':
          this.playGame = !this.playGame;
          break;
      }
    })
  }
  
  checkCollisions() {
    this.ball.collideWithPlatform();
    
    this.bricks.forEach((brick, idx) => {
      if (this.ball.collideWithBrick(brick)) {
        this.bricks.splice(idx, 1);
      }
    })
  }

  countScore() {
    this.score = Game.BRICK_POS.rows * Game.BRICK_POS.cols - this.bricks.length;
    document.getElementById('score-counter').innerText = this.score;

    if (this.bricks.length === 0) {
      document.getElementById('modal-win').style.display = 'flex';
    }
    
  }
  
  step(timeDelta) {
    if (this.playGame) {
      this.ball.move(timeDelta)
    } else {
      this.ball.resetBall();
    }
    
    this.checkCollisions();
    this.countScore();
  }
  
  draw(ctx) {    
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.bricks.forEach((brick) => brick.draw());
    this.platform.draw();
    this.ball.draw();
  }
  
}

Game.BG_COLOR = "#000000";
Game.DIM_X = Math.min(window.innerWidth * 0.8, 1250);
Game.DIM_Y = window.innerHeight * 0.8;
Game.FPS = 32;

Game.BRICK_POS = {
  rows: 3,
  cols: 6,
  gap: 10
}

Game.BRICK_SIZE = {
  width: ((Game.DIM_X * 0.9) - ((Game.BRICK_POS.cols - 1) * Game.BRICK_POS.gap)) / Game.BRICK_POS.cols,
  height: 25
}

module.exports = Game;