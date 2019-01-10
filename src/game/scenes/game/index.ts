import { Container } from 'pixi.js';
import {
  IDestroy,
  IHitArea,
  IPosition,
  IScene,
  ISceneObject,
  IScore,
  IShootable,
} from '../../engine/interfaces';
import Viewport from '../../engine/viewport';
import Enemy from './enemy';
import Player from './player';
import PlayerCollision from './playerCollision';
import UserInterface from './userInterface';

const deltaTime = 5000;
const numEnemies = 1;

export default class GameScene implements IScene, IScore {
  public id = 'game';
  public container: Container = new Container();
  public player: ISceneObject & IPosition & IHitArea & IDestroy;
  public enemies: Array<ISceneObject & IPosition & IShootable>;
  public score: number;

  private time: number;
  private playerCollision: PlayerCollision;
  private userInterface: UserInterface;

  constructor(public viewport: Viewport) {
    this.enemies = new Array();
    this.player = new Player(this);
    this.userInterface = new UserInterface(this);
    this.score = 0;

    viewport.mainContainer.addChild(this.container);
  }

  public async preload() {
    await this.player.preload();
    await this.userInterface.preload();
  }

  public create() {
    this.player.create(this);
    this.spawnEnemies();
    this.playerCollision = new PlayerCollision(this);
    this.userInterface.create(this);
  }

  public update() {
    if (!this.playerCollision.isDead) {
      this.spawnEnemies();
      this.player.update();
      this.updateEnemies();
      this.playerCollision.update();
      this.userInterface.update();
    }
  }

  private cleanEnemies() {
    const liveEnemies = this.enemies.filter((enemy) => enemy.health > 0);
    this.score += this.enemies.length - liveEnemies.length;
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
