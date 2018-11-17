import { Container, loaders, SystemRenderer } from 'pixi.js';

export interface IActor {
  loadContent(spriteSheet: loaders.Resource, container: Container): void;

  draw(): void;

  update(renderer: SystemRenderer): void;
}
