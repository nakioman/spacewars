import { Howl } from 'howler';
import { Container, HitArea, loaders, Point } from 'pixi.js';
import GameScene from '../';
import {
  IDestroy,
  IHitArea,
  IPosition,
  IScene,
  ISceneObject,
} from '../../../engine/interfaces';
import ResourceManager from '../../../engine/resourceManager';
import getParticle from '../../../particles/explosion';
import BodySprite from '../common/bodySprite';
import PlayerMovement from './movement';
import Shooting from './shooting';

const textureName: string = 'playerShip2_green.png';

export default class Player implements ISceneObject, IPosition, IHitArea, IDestroy {
  public get x(): number {
    return this.body.x;
  }

  public get y(): number {
    return this.body.y;
  }

  public get hitArea(): HitArea {
    return this.body.hitArea;
  }

  public spriteSheet: loaders.Resource;
  private object: Container = new Container();

  private body: BodySprite;
  private playerMovement: PlayerMovement;
  private shooting: Shooting;
  private shootingSound: Howl;

  public constructor(private scene: GameScene) {}

  public async preload() {
    this.spriteSheet = await ResourceManager.create('gameSheet', 'assets/img/sheet.json');
    await new Promise<void>((resolve) => {
      this.shootingSound = new Howl({
        src: ['assets/snd/laser_shoot.ogg', 'assets/snd/laser_shoot.mp3'],
      });
      this.shootingSound.on('load', () => {
        resolve();
      });
    });
  }

  public create(scene: IScene) {
    scene.container.addChild(this.object);

    const playerTexture = this.spriteSheet.textures[textureName];
    const explosionParticle = getParticle();

    this.body = new BodySprite(
      scene.viewport.centerX,
      scene.viewport.centerY,
      playerTexture,
      explosionParticle,
      this.object,
    );
    this.playerMovement = new PlayerMovement(this.body);
    this.shooting = new Shooting(
      this.body,
      this.spriteSheet,
      this.object,
      this.shootingSound,
      this.scene,
    );
  }

  public destroy(): void {
    this.body.destroy();
  }

  public containsPoint(x: number, y: number): boolean {
    const globalPoint = this.object.toGlobal(new Point(x, y));
    return this.body.containsPoint(globalPoint.x, globalPoint.y);
  }

  public update(): void {
    this.playerMovement.update();
    this.shooting.update();
  }
}
