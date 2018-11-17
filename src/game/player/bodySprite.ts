import { Container, loaders, Sprite } from 'pixi.js';

const textureName: string = 'playerShip2_green.png';

export default class PlayerBodySprite {
  private body: Sprite;

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

  constructor(x: number, y: number, spriteSheet: loaders.Resource, stage: Container) {
    const playerTexture = spriteSheet.textures[textureName];
    this.body = new Sprite(playerTexture);
    this.body.position.x = x;
    this.body.position.y = y;
    this.body.anchor.set(0.5, 0.5);
    this.body.rotation = 0;

    stage.addChild(this.body);
  }
}
