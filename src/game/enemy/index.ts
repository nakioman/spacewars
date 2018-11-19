import Game from '../game';
import Player from '../player';
import EnemyBodySprite from './bodySprite';
import CollisionDetection from './collisionDetection';
import EnemyMovement from './movement';

export default class Enemy {
  private body: EnemyBodySprite;
  private movement: EnemyMovement;
  private collisionDetection: CollisionDetection;

  public get x(): number {
    return this.body.x;
  }

  public get y(): number {
    return this.body.y;
  }

  constructor(game: Game, player: Player) {
    this.body = new EnemyBodySprite(game.spriteSheet, game.stage, game.renderer);
    this.movement = new EnemyMovement(this.body, player);
    this.collisionDetection = new CollisionDetection(this.body, player);
  }

  public update() {
    this.body.update();
    this.movement.update();
    this.collisionDetection.update();
  }
}
