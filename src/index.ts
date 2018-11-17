import Game from './game/game';

import './css/styles.css';

const body = document.body;

const game = new Game(body, window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
  const height = window.innerHeight;
  const width = window.innerWidth;

  game.resize(width, height);
});

game.start();
