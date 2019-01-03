import { Container, loaders } from 'pixi.js';
import BodySprite from '../common/bodySprite';
import Viewport from '../engine/viewport';
import GameScene from '../scenes/game';
import ProyectileSprite from './proyectileSprite';

const bulletSpeed: number = 5;
const nextBulletCycles: number = 30;

export default class Shooting {
  private bullets: ProyectileSprite[];
  private bulletCycles: number;

  constructor(
    private body: BodySprite,
    private spriteSheet: loaders.Resource,
    private stage: Container,
    private sound: Howl,
    private scene: GameScene,
  ) {
    this.bullets = [];
    this.bulletCycles = 0;
  }

  public update() {
    this.shoot();
    this.animateBullets();
    this.updateHittedEnemies();
    this.removeBulletsOffScreen();
  }

  private shoot() {
    if (this.bulletCycles === 0) {
      const bullet = new ProyectileSprite(this.body, this.spriteSheet, this.stage);
      this.bullets.push(bullet);
      this.bulletCycles = nextBulletCycles;
      this.sound.play();
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
        bullet.x > Viewport.width || bullet.x < 0 || bullet.y > Viewport.height || bullet.y < 0,
    );
    bulletsOffScreen.forEach((bullet) => {
      bullet.destroy();
    });
    const originalBullets = new Set(this.bullets);
    const bulletsToRemove = new Set(bulletsOffScreen);
    const difference = new Set([...originalBullets].filter((x) => !bulletsToRemove.has(x)));
    this.bullets = Array.from(difference);
  }

  private updateHittedEnemies() {
    this.bullets.forEach((bullet, idx) => {
      this.scene.enemies.forEach((enemy) => {
        enemy.hit(bullet.x, bullet.y);
      });
    });
  }
}
