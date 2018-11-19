import { Container, loaders, Sprite } from 'pixi.js';
import Player from '.';
import PlayerBodySprite from './bodySprite';

const bulletTextureName = 'Lasers/laserRed01.png';

export default class ProyectileSprite {
  private bullet: Sprite;

  public get x(): number {
    return this.bullet.x;
  }
  public set x(value: number) {
    this.bullet.x = value;
  }

  public get y(): number {
    return this.bullet.y;
  }

  public set y(value: number) {
    this.bullet.y = value;
  }

  public get rotation(): number {
    return this.bullet.rotation;
  }

  public set rotation(value: number) {
    this.bullet.rotation = value;
  }

  constructor(
    body: PlayerBodySprite,
    spriteSheet: loaders.Resource,
    private stage: Container,
  ) {
    const bulletTexture = spriteSheet.textures[bulletTextureName];
    this.bullet = new Sprite(bulletTexture);

    this.bullet.anchor.set(0.5, 1);
    this.bullet.position.x = body.x + Math.sin(body.rotation) * 30;
    this.bullet.position.y = body.y - Math.cos(body.rotation) * 30;
    this.bullet.rotation = body.rotation;

    stage.addChild(this.bullet);
  }

  public destroy(): void {
    this.stage.removeChild(this.bullet);
    this.bullet.destroy();
  }
}
