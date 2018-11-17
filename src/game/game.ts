import { autoDetectRenderer, Container, loaders, SystemRenderer } from 'pixi.js';
import Player from './player';

export default class Game {
  public stage: Container;
  public renderer: SystemRenderer;
  public spriteSheet: loaders.Resource;
  private player: Player;

  private intervalId: number;

  constructor(element: HTMLElement, width: number, height: number) {
    if (!element) {
      throw Error('There is no element to render the game');
    }

    this.stage = new Container();

    this.renderer = autoDetectRenderer(width, height, {
      antialias: true,
      autoResize: true,
      transparent: true,
    });

    element.appendChild(this.renderer.view);

    const loader = new loaders.Loader();
    loader.add('sheet', 'img/sheet.json').load(() => {
      this.spriteSheet = loader.resources.sheet;
      this.setupEntities();
      requestAnimationFrame(this.update.bind(this));
    });
  }

  public update() {
    this.player.update();
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
  }

  private setupEntities() {
    const originX = this.renderer.width / 2;
    const originY = this.renderer.height / 2;
    this.player = new Player(originX, originY, this);
  }
}
