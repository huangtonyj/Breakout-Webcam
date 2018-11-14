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

  // Modals to choose keyboard or webcam hand guestures.
  const modalInit = document.getElementById('modal-init');
  const modalLeft = document.getElementById('modal-left');
  const modalRight = document.getElementById('modal-right');
  const modalNeutral = document.getElementById('modal-neutral');
    
  // Use keyboard to play game
  document.getElementById('button-keyboard')
    .addEventListener('click', () => {
      modalInit.style.display = 'none';
    });

  // Initial model training steps
  document.getElementById('button-webcam')
    .addEventListener('click', () => {
      new TfWebcamControl(game.platform);

      modalInit.style.display = 'none';
      modalLeft.style.display = 'block';
    });

  document.getElementById('button-right')
    .addEventListener('click', () => {
      modalLeft.style.display = 'none';
      modalRight.style.display = 'block';
    });

  document.getElementById('button-neutral')
    .addEventListener('click', () => {
      modalRight.style.display = 'none';
      modalNeutral.style.display = 'block';
    });

  document.getElementById('button-train')
    .addEventListener('click', () => {
      modalNeutral.style.display = 'none';
    });

  document.getElementById('button-tf-webcam').addEventListener('click', () => {
    new TfWebcamControl(game.platform);
    document.getElementById('modal-init').style.display = 'none';
  });

});

