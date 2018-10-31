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
  constructor(canvas, options) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.x_i = options.x_i;
    this.y_i = options.y_i;
    this.x = this.x_i;
    this.y = this.y_i;
    
    this.ballVelocity = 3;
    this.dx = this.ballVelocity;
    this.dy = -this.ballVelocity;
    
    this.ballRadius = 10;
    this.fillStyle = 'orange';
    this.strokeStyle = 'black';
  }

  update() {
    this.clearBallPath();

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);

    this.context.fillStyle = this.fillStyle;
    this.context.fill();
    
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();

    this.x += this.dx;
    this.y += this.dy;

    if ((this.x > this.canvas.width - this.ballRadius) || (this.x < this.ballRadius)) {
      this.dx *= -1;      
    }

    if (this.y < this.ballRadius) {
      this.dy *= -1;
    } else if (this.y > (this.canvas.height - this.ballRadius)) {
      this.x = this.x_i;
      this.y = this.y_i;
      this.dx = this.ballVelocity;
      this.dy = -this.ballVelocity;
    }
  }

  clearBallPath() {
    // Need a more elaborate algo
    this.context.clearRect(this.x - 15, this.y - 15, this.ballRadius * 3, this.ballRadius * 3)
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

const Ball = __webpack_require__(/*! ./ball */ "./scripts/ball.js");
const Platform = __webpack_require__(/*! ./platform */ "./scripts/platform.js");

const canvas = document.getElementById('canvasRoot');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = 1000;
canvas.height = 700;

const canvasContext = canvas.getContext('2d');

// Platform
const platformWidth = 150;
const platformHeight = 15;
let platformX = (canvas.width - platformWidth) / 2;
let platformY = (canvas.height - platformHeight - 15);

canvasContext.beginPath();
canvasContext.fillRect(platformX, platformY, platformWidth, platformHeight)

const platform = new Platform(canvas, platformWidth, platformHeight)


// Ball
const ballRadius = 10;
const ballVelocity = 3;

const ball = new Ball(canvas,
  {
    x_i: platformX + (platformWidth/2),
    y_i: platformY - platformHeight
  })

function animate () {
  requestAnimationFrame(animate);

  ball.update();

}

animate();

/***/ }),

/***/ "./scripts/platform.js":
/*!*****************************!*\
  !*** ./scripts/platform.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Platform {
  constructor(canvas, options) {
    this.canvas = canvas;
    // this.x_i = options.x_i;
    // this.y_i = options.y_i;

    this.context = this.canvas.getContext('2d');
  }
}

module.exports = Platform;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map