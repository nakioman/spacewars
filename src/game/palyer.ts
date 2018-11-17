import { Container, loaders, Sprite, SystemRenderer } from 'pixi.js';

import Controls from './controls';
import { IActor } from './interfaces';

export default class Player implements IActor {
  private static textureName: string = 'playerShip2_green.png';
  private static velocity: number = 10;

  private x: number;
  private y: number;
  private rotation: number;

  private body: Sprite;
  private controls: Controls;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.controls = new Controls();

    window.addEventListener('keyup', (event) => this.controls.onKeyUp(event), false);
    window.addEventListener('keydown', (event) => this.controls.onKeyDown(event), false);
  }

  public loadContent(spriteSheet: loaders.Resource, container: Container) {
    const texture = spriteSheet.textures[Player.textureName];

    this.body = new Sprite(texture);
    this.body.position.x = this.x;
    this.body.position.y = this.y;
    this.body.anchor.set(0.5, 0.5);
    this.body.rotation = 0;

    container.addChild(this.body);
  }

  public draw(): void {
    this.body.position.y = this.y;
    this.body.position.x = this.x;
    this.body.rotation = this.rotation;
  }

  public update(renderder: SystemRenderer): void {
    if (this.controls.isMovingUp()) {
      this.y -= Player.velocity;
      if (this.y < 0) {
        this.y = renderder.height;
      }
    }
    if (this.controls.isMovingDown()) {
      this.y += Player.velocity;
      if (this.y > renderder.height) {
        this.y = 0;
      }
    }
    if (this.controls.isMovingLeft()) {
      this.x -= Player.velocity;
      if (this.x < 0) {
        this.x = renderder.width;
      }
    }
    if (this.controls.isMovingRight()) {
      this.x += Player.velocity;
      if (this.x > renderder.width) {
        this.x = 0;
      }
    }

    let dx = this.x - this.body.position.x;
    let dy = this.body.position.y - this.y;
    const len = Math.sqrt(dx * dx + dy * dy);

    dx /= len ? len : 1.0;
    dy /= len ? len : 1.0;

    this.rotation = Math.atan2(dx, dy);
  }
}
