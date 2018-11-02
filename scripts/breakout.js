const Game = require('./game');
const Gameview = require('./game_view');

const tf_controls = require('./tf/index_tf');

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvasRoot');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = (window.innerHeight) * 0.8;

  const ctx = canvas.getContext('2d');
  const game = new Game(ctx);
  new Gameview(game, ctx).start();

  // tf_controls.init()
});
