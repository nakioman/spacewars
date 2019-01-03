import { Container, loaders, Point } from 'pixi.js';
import getParticle from '../../particles/explosion';
import RotableBodySprite from '../common/rotableBodySprite';
import { IPosition, IScene, ISceneObject, IShootable } from '../engine/interfaces';
import ResourceManager from '../engine/resourceManager';
import Viewport from '../engine/viewport';
import EnemyMovement from './movement';

const textureNames: string[] = ['ufoBlue.png', 'ufoGreen.png', 'ufoRed.png', 'ufoYellow.png'];

export default class Enemy implements ISceneObject, IPosition, IShootable {
  public health: number = 1;

  private body: RotableBodySprite;
  private movement: EnemyMovement;
  private spriteSheet: loaders.Resource;
  private object: Container = new Container();

  public get x(): number {
    return this.body.x;
  }

  public get y(): number {
    return this.body.y;
  }

  constructor(private playerPosition: IPosition) {}

  public async preload() {
    this.spriteSheet = await ResourceManager.create('gameSheet', 'img/sheet.json');
  }

  public create(scene: IScene) {
    const x = Math.round(Math.random()) * Viewport.width;
    const y = Math.round(Math.random()) * Viewport.height;
    const textureIdx = Math.floor(Math.random() * (textureNames.length - 1));
    const textureName = textureNames[textureIdx];
    const bodyTexture = this.spriteSheet.textures[textureName];
    const explosionParticle = getParticle();

    this.body = new RotableBodySprite(x, y, bodyTexture, explosionParticle, this.object);
    this.movement = new EnemyMovement(this.body, this.playerPosition);

    scene.container.addChild(this.object);
  }

  public update() {
    if (this.health > 0) {
      this.body.update();
      this.movement.update();
    }
  }

  public hit(x: number, y: number): boolean {
    const globalPoint = this.object.toGlobal(new Point(x, y));
    const hitted = this.body.containsPoint(globalPoint.x, globalPoint.y);
    if (hitted) {
      this.health--;
      if (this.health === 0) {
        this.body.destroy();
      }
      return true;
    }
    return false;
  }
}
