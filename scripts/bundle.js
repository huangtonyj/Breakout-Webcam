/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/breakout.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/ball.js":
/*!*************************!*\
  !*** ./scripts/ball.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Ball {
  constructor(ctx, platform) {
    this.ctx = ctx;

    this.platform = platform;
    
    this.ballVelocity = 3;
    this.ballRadius = 8;
    this.fillStyle = 'orange';
    this.strokeStyle = 'black';

    this.resetBall();
  }

  move(delta) {
    this.x += this.dx;
    this.y += this.dy;

    if ((this.x > this.ctx.canvas.width - this.ballRadius) || (this.x <= this.ballRadius)) { 
      this.dx *= -1; 
    }

    if (this.y < this.ballRadius) { 
      this.dy *= -1;
    } else if (this.y > (this.ctx.canvas.height - this.ballRadius)) { 
      this.resetBall();
    }    
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);

    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.stroke();
  }

  resetBall() {
    this.x = this.platform.x_mid;
    this.y = this.platform.y_top;
    this.dx = this.ballVelocity;
    this.dy = -this.ballVelocity;
  }

}

module.exports = Ball;

/***/ }),

/***/ "./scripts/breakout.js":
/*!*****************************!*\
  !*** ./scripts/breakout.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./scripts/game.js");
const Gameview = __webpack_require__(/*! ./game_view */ "./scripts/game_view.js");

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvasRoot');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = (window.innerHeight) * 0.8;

  const ctx = canvas.getContext('2d');
  const game = new Game(ctx);
  new Gameview(game, ctx).start();
});

/***/ }),

/***/ "./scripts/brick.js":
/*!**************************!*\
  !*** ./scripts/brick.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./scripts/game.js":
/*!*************************!*\
  !*** ./scripts/game.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Platform = __webpack_require__(/*! ./platform */ "./scripts/platform.js");
const Ball = __webpack_require__(/*! ./ball */ "./scripts/ball.js");
const Brick = __webpack_require__(/*! ./brick */ "./scripts/brick.js");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.platform = new Platform(ctx);
    this.ball = new Ball(ctx, this.platform);
    this.bricks = [];

    this.addBricks();
    console.log(ctx.canvas.width);
    
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
    // console.log('checking collisions');
  }

  step(delta) {
    // console.log(delta);
    this.platform.move(delta);
    this.ball.move(delta);
    this.checkCollisions();
  }

}

Game.BG_COLOR = "#000000";
Game.DIM_X = window.innerWidth * 0.8;
Game.DIM_Y = window.innerHeight * 0.8;
Game.FPS = 32;

Game.BRICK_ROWS = 3;
Game.BRICK_COLS = 5;
Game.BRICK_GAP = 10;
Game.BRICK_POS = {
  rows: 3,
  cols: 7,
  gap: 10
}

Game.BRICK_SIZE = {
  width: ((Game.DIM_X * 0.9) - ((Game.BRICK_POS.cols - 1) * Game.BRICK_POS.gap)) / Game.BRICK_POS.cols,
  height: 25
}

module.exports = Game;

/***/ }),

/***/ "./scripts/game_view.js":
/*!******************************!*\
  !*** ./scripts/game_view.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;

/***/ }),

/***/ "./scripts/platform.js":
/*!*****************************!*\
  !*** ./scripts/platform.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  }

  move(delta) {
    // this.x += dx;
    // console.log(`platform moved by ${delta}`);
  }

  draw() {
     this.ctx.beginPath();
     this.ctx.fillStyle = this.fillStyle;
     this.ctx.fill();
     this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

module.exports = Platform;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map