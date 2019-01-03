import { Howler } from 'howler';
import { autoDetectRenderer, Container } from 'pixi.js';
import Viewport from './game/engine/viewport';
import GameScene from './game/scenes/game';

import './css/styles.css';

const body = document.body;
const stage = new Container();
const renderer = autoDetectRenderer(Viewport.width, Viewport.height, {
  antialias: true,
  autoResize: true,
  resolution: window.devicePixelRatio || 1,
  roundPixels: true,
  transparent: true,
});
renderer.view.id = 'pixi-canvas';
body.appendChild(renderer.view);

const viewport = new Viewport(renderer, stage);
const scene = new GameScene(viewport);

scene.preload().then(() => {
  scene.create();
  update();
});

const update = (): void => {
  scene.update();
  renderer.render(stage);
  requestAnimationFrame(update);
};

Howler.mute(true);
