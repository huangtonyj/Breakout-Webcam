const Game = require('./game');
const Gameview = require('./game_view');
const TfWebcamControl = require('./tf_webcam_control/tf_webcam_control')

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvasRoot');
    canvas.width = Math.min(window.innerWidth * 0.8, 1250);
    canvas.height = (window.innerHeight) * 0.6;

  const ctx = canvas.getContext('2d');
  const game = new Game(ctx);
  new Gameview(game, ctx).start();

  // Use webcam hand guesture controls to play game
  document.getElementById('button-tf-webcam').addEventListener('click', () => {
    new TfWebcamControl(game.platform);
    document.getElementById('modal-init').style.display = 'none';
    document.getElementById('modal-loading').style.display = 'block';
  });
    
  // Use keyboard to play game
  document.getElementById('button-keyboard')
    .addEventListener('click', () => {
      document.getElementById('modal-init').style.display = 'none';
    });
});

