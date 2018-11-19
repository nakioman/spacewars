import { HitArea } from 'pixi.js';
import Game from '../game';
import PlayerBodySprite from './bodySprite';
import PlayerMovement from './movement';
import Shooting from './shooting';
import Status from './status';

export default class Player {
  public get x(): number {
    return this.body.x;
  }

  public get y(): number {
    return this.body.y;
  }

  public get hitArea(): HitArea {
    return this.body.hitArea;
  }

  public get health(): number {
    return this.status.health;
  }

  private status: Status;
  private body: PlayerBodySprite;
  private playerMovement: PlayerMovement;
  private shooting: Shooting;

  constructor(x: number, y: number, game: Game) {
    this.status = new Status();
    this.body = new PlayerBodySprite(x, y, this.status, game.spriteSheet, game.stage);
    this.playerMovement = new PlayerMovement(this.body, this.status, game.renderer);
    this.shooting = new Shooting(
      this.body,
      this.status,
      game.renderer,
      game.spriteSheet,
      game.stage,
    );
  }

  public destroy(): void {
    this.body.destroy();
  }

  public containsPoint(x: number, y: number): boolean {
    return this.body.containsPoint(x, y);
  }

  public update(): void {
    this.playerMovement.update();
    this.shooting.update();
  }
}
