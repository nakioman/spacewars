import { Container, loaders, Sprite, SystemRenderer } from 'pixi.js';

const textureNames: string[] = ['ufoBlue.png', 'ufoGreen.png', 'ufoRed.png', 'ufoYellow.png'];

export default class EnemyBodySprite {
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

  constructor(
    spriteSheet: loaders.Resource,
    private stage: Container,
    renderer: SystemRenderer,
  ) {
    const textureIdx = Math.floor(Math.random() * (textureNames.length + 1));
    const textureName = textureNames[textureIdx];
    const playerTexture = spriteSheet.textures[textureName];
    const x = Math.round(Math.random()) * renderer.width;
    const y = Math.round(Math.random()) * renderer.height;

    this.body = new Sprite(playerTexture);
    this.body.x = x;
    this.body.y = y;
    this.body.anchor.set(0.5, 0.5);
    this.body.rotation = 0;

    stage.addChild(this.body);
  }

  public destroy(): void {
    this.stage.removeChild(this.body);
    this.body.destroy();
  }

  public update(): void {
    this.body.rotation += 0.01;
  }
}
