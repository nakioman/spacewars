import { Container, loaders, Sprite, SystemRenderer, Texture } from 'pixi.js';

import Controls from './controls';
import { IActor, IGame } from './interfaces';

export default class Player implements IActor {
  private static bulletTextureName: string = 'Lasers/laserRed01.png';
  private static playerTextureName: string = 'playerShip2_green.png';
  private static playerSpeed: number = 7.5;
  private static bulletSpeed: number = 10;
  private static showWaitCycles: number = 25;

  private x: number;
  private y: number;
  private rotation: number;

  private bullets: Sprite[];
  private bulletTexture: Texture;
  private player: Sprite;
  private controls: Controls;
  private shootWait: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.controls = new Controls();
    this.bullets = new Array<Sprite>();
    this.shootWait = 0;

    window.addEventListener('keyup', (event) => this.controls.onKeyUp(event), false);
    window.addEventListener('keydown', (event) => this.controls.onKeyDown(event), false);
  }

  public loadContent(game: IGame) {
    const { spriteSheet, stage } = game;
    const playerTexture = spriteSheet.textures[Player.playerTextureName];
    this.bulletTexture = spriteSheet.textures[Player.bulletTextureName];

    this.player = new Sprite(playerTexture);
    this.player.position.x = this.x;
    this.player.position.y = this.y;
    this.player.anchor.set(0.5, 0.5);
    this.player.rotation = 0;

    stage.addChild(this.player);
  }

  public draw(game: IGame): void {
    this.movePlayer();
    this.animateBullets();
  }

  public update(game: IGame): void {
    const { renderer, stage } = game;
    if (this.controls.isMovingUp()) {
      this.y -= Player.playerSpeed;
      if (this.y < 0) {
        this.y = renderer.height;
      }
    }
    if (this.controls.isMovingDown()) {
      this.y += Player.playerSpeed;
      if (this.y > renderer.height) {
        this.y = 0;
      }
    }
    if (this.controls.isMovingLeft()) {
      this.x -= Player.playerSpeed;
      if (this.x < 0) {
        this.x = renderer.width;
      }
    }
    if (this.controls.isMovingRight()) {
      this.x += Player.playerSpeed;
      if (this.x > renderer.width) {
        this.x = 0;
      }
    }

    let dx = this.x - this.player.position.x;
    let dy = this.player.position.y - this.y;
    const len = Math.sqrt(dx * dx + dy * dy);

    dx /= len ? len : 1.0;
    dy /= len ? len : 1.0;

    const newRotation = Math.atan2(dx, dy);
    if (newRotation !== this.rotation) {
      this.rotation = Math.atan2(dx, dy);
      this.shootWait = 0;
    }

    this.shoot(stage);
    this.removeBulletsOutsideScreen(renderer);
  }

  private animateBullets() {
    this.bullets.forEach((bullet) => {
      bullet.position.x += Math.sin(bullet.rotation) * Player.bulletSpeed;
      bullet.position.y -= Math.cos(bullet.rotation) * Player.bulletSpeed;
    });
  }

  private movePlayer() {
    this.player.position.y = this.y;
    this.player.position.x = this.x;
    this.player.rotation = this.rotation;
  }

  private removeBulletsOutsideScreen(renderer: SystemRenderer) {
    this.bullets = this.bullets.filter((bullet) => !(bullet.x > renderer.width ||
      bullet.x < 0 || bullet.y > renderer.height || bullet.y < 0));
  }

  private shoot(container: Container) {
    if (this.shootWait > 0) {
      this.shootWait--;
    } else {
      const bullet = new Sprite(this.bulletTexture);
      bullet.anchor.set(0.5, 1);
      bullet.position.x = this.x + Math.sin(this.rotation) * 30;
      bullet.position.y = this.y - Math.cos(this.rotation) * 30;
      bullet.rotation = this.rotation;

      container.addChild(bullet);
      this.bullets.push(bullet);

      this.shootWait = Player.showWaitCycles;
    }
  }
}
