import { Container, loaders, SystemRenderer } from 'pixi.js';
import PlayerBodySprite from './bodySprite';
import ProyectileSprite from './proyectileSprite';

const bulletSpeed: number = 5;
const nextBulletCycles: number = 30;

export default class Shooting {
  private bullets: ProyectileSprite[];
  private bulletCycles: number;

  constructor(
    private renderer: SystemRenderer,
    private spriteSheet: loaders.Resource,
    private body: PlayerBodySprite,
    private stage: Container,
  ) {
    this.bullets = [];
    this.bulletCycles = 0;
  }

  public update() {
    this.shoot();
    this.animateBullets();
    this.removeBulletsOffScreen();
  }

  private shoot() {
    if (this.bulletCycles === 0) {
      const bullet = new ProyectileSprite(this.spriteSheet, this.body, this.stage);
      this.bullets.push(bullet);
      this.bulletCycles = nextBulletCycles;
    }
    this.bulletCycles--;
  }

  private animateBullets() {
    this.bullets.forEach((bullet) => {
      bullet.x += Math.sin(bullet.rotation) * bulletSpeed;
      bullet.y -= Math.cos(bullet.rotation) * bulletSpeed;
    });
  }

  private removeBulletsOffScreen() {
    const bulletsOffScreen = this.bullets.filter(
      (bullet) =>
        bullet.x > this.renderer.width ||
        bullet.x < 0 ||
        bullet.y > this.renderer.height ||
        bullet.y < 0,
    );
    bulletsOffScreen.forEach((bullet) => {
      bullet.destroy();
    });
    const originalBullets = new Set(this.bullets);
    const bulletsToRemove = new Set(bulletsOffScreen);
    const difference = new Set([...originalBullets].filter((x) => !bulletsToRemove.has(x)));
    this.bullets = Array.from(difference);
  }
}
