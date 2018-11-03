const Platform = require('./platform');
const Ball = require('./ball');
const Brick = require('./brick');
const TfWebcamControl = require('./tf_webcam_control/tf_webcam_control')
// const tfControls = require('./tf/index_tf');

class Game {
  
  constructor(ctx) {
    this.ctx = ctx;
    this.platform = new Platform(ctx);
    this.ball = new Ball(ctx, this.platform);
    this.bricks = [];
    // Refactor TF webcam into class and pass this.platform to it.
    this.TfWebcamControl = new TfWebcamControl(this.platform);

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
      this.platform.handleMove(e.key)
      // refactor into switch case,
        // call play game
        // or move platform
    })

    // document.getElementById('predict').addEventListener('click', () => {
    //   // ui.startTfPrediction();
    //   // isPredicting = true;
    //   tfControls.predict();
    // });

    // document.getElementById('webcamPredictions')
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