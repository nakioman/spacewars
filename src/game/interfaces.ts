import { Container, loaders, SystemRenderer } from 'pixi.js';

export interface IGame {
  renderer: SystemRenderer;
  spriteSheet: loaders.Resource;
  stage: Container;
}

export interface IActor {
  loadContent(game: IGame): void;

  draw(game: IGame): void;

  update(game: IGame): void;
}
