import { Emitter } from 'pixi-particles';
import { Container, HitArea, loaders, Point, Rectangle, Sprite, Texture } from 'pixi.js';

import explosionParticle from '../../particles/explosion.json';
import Status from './status.js';

const textureName: string = 'playerShip2_green.png';
const explosionTextureName: string = 'img/particle.png';

export default class PlayerBodySprite {
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
  private body: Sprite;
  private explosion: Emitter;

  constructor(
    x: number,
    y: number,
    private status: Status,
    spriteSheet: loaders.Resource,
    private stage: Container,
  ) {
    const playerTexture = spriteSheet.textures[textureName];
    const explosionTexture = Texture.fromImage(explosionTextureName);

    this.body = new Sprite(playerTexture);
    this.body.x = x;
    this.body.y = y;
    this.body.anchor.set(0.5, 0.5);
    this.body.rotation = 0;
    this.body.interactive = true;
    this.body.hitArea = new Rectangle(0, 0, this.body.width, this.body.height);
    stage.addChild(this.body);

    this.explosion = new Emitter(this.stage, explosionTexture, explosionParticle);
  }

  public containsPoint(x: number, y: number): boolean {
    return this.body.containsPoint(new Point(x, y));
  }

  public destroy(): void {
    this.status.health = 0;
    this.stage.removeChild(this.body);
    this.explosion.updateSpawnPos(this.body.x, this.body.y);
    this.explosion.playOnceAndDestroy();
  }
}
