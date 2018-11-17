import { autoDetectRenderer, Container, loaders, SystemRenderer } from 'pixi.js';
import { IActor } from './interfaces';
import Player from './palyer';

export default class Game {
  public stage: Container;
  public renderer: SystemRenderer;
  public loader: loaders.Loader;
  public spriteSheet: loaders.Resource;
  public player: IActor;

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

    this.loader = new loaders.Loader();

    element.appendChild(this.renderer.view);

    const originX = width / 2;
    const originY = height / 2;
    this.player = new Player(originX, originY);
  }

  public start = async () => {
    const fps = 60;
    const ticks = 1000 / fps;

    await this.loadContent();

    this.intervalId = setInterval(() => {
      this.update();
      requestAnimationFrame(this.draw);
    }, ticks);
  }

  public stop = () => {
    clearInterval(this.intervalId);
  }

  public resize = (width: number, height: number) => {
    this.renderer.resize(width, height);
  }

  public loadContent() {
    return new Promise<void>((resolve) => {
      this.loader.add('sheet', 'img/sheet.json').load(() => {
        this.spriteSheet = this.loader.resources.sheet;
        this.player.loadContent(this.spriteSheet, this.stage);

        resolve();
      });
    });
  }

  public draw = () => {
    this.player.draw();
    this.renderer.render(this.stage);
  }

  public update = () => {
    this.player.update(this.renderer);
  }
}
