import { Container } from 'pixi.js';
import Enemy from '../../enemy';
import {
  IDestroy,
  IHitArea,
  IPosition,
  IScene,
  ISceneObject,
  IShootable,
} from '../../engine/interfaces';
import Viewport from '../../engine/viewport';
import Player from '../../player';
import PlayerCollision from './playerCollision';

const deltaTime = 5000;
const numEnemies = 1;

export default class GameScene implements IScene {
  public id = 'game';
  public container: Container = new Container();
  public player: ISceneObject & IPosition & IHitArea & IDestroy;
  public enemies: Array<ISceneObject & IPosition & IShootable>;

  private time: number;
  private playerCollision: PlayerCollision;

  constructor(public viewport: Viewport) {
    this.enemies = new Array();
    this.player = new Player(this);

    viewport.mainContainer.addChild(this.container);
  }

  public async preload() {
    await this.player.preload();
  }

  public create() {
    this.player.create(this);
    this.spawnEnemies();
    this.playerCollision = new PlayerCollision(this);
  }

  public update() {
    if (!this.playerCollision.isDead) {
      this.spawnEnemies();
      this.player.update();
      this.updateEnemies();
      this.playerCollision.update();
    }
  }

  private cleanEnemies() {
    const liveEnemies = this.enemies.filter((enemy) => enemy.health > 0);
    this.enemies = liveEnemies;
  }

  private async spawnEnemies() {
    if (this.time < Date.now() - deltaTime || !this.time) {
      for (let i = 0; i < numEnemies; i++) {
        const enemy = new Enemy(this.player);

        await enemy.preload();
        enemy.create(this);
        this.enemies.push(enemy);
      }
      this.time = Date.now();
    } else {
      this.cleanEnemies();
    }
  }

  private updateEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }
}
