import { Emitter } from 'pixi-particles';
import { Container, HitArea, Point, Rectangle, Sprite, Texture } from 'pixi.js';
import ResourceManager from '../../../engine/resourceManager';

const explosionTextureName: string = 'assets/img/particle.png';

export default class BodySprite {
  public get x(): number {
    return this.body.x;
  }
  public set x(value: number) {
    this.body.x = value;
  }

  public get y(): number {
    return this.body.y;
  }

  public set y(value: number) {
    this.body.y = value;
  }

  public get rotation(): number {
    return this.body.rotation;
  }

  public set rotation(value: number) {
    this.body.rotation = value;
  }

  public get hitArea(): HitArea {
    return this.body.hitArea;
  }
  protected body: Sprite;
  private explosion: Emitter;

  constructor(
    x: number,
    y: number,
    bodyTexture: Texture,
    explosionParticle: any,
    private container: Container,
  ) {
    const explosionTexture = ResourceManager.textureFromImage(explosionTextureName);

    this.body = new Sprite(bodyTexture);
    this.body.x = x;
    this.body.y = y;
    this.body.anchor.set(0.5, 0.5);
    this.body.rotation = 0;
    this.body.interactive = true;
    this.body.hitArea = new Rectangle(0, 0, this.body.width, this.body.height);
    container.addChild(this.body);

    this.explosion = new Emitter(this.container, explosionTexture, explosionParticle);
  }

  public containsPoint(x: number, y: number): boolean {
    return this.body.containsPoint(new Point(x, y));
  }

  public destroy(): void {
    this.container.removeChild(this.body);
    this.explosion.updateSpawnPos(this.body.x, this.body.y);
    this.explosion.playOnceAndDestroy();
  }
}
