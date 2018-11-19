import Game from '../game';
import Player from '../player';
import EnemyBodySprite from './bodySprite';
import EnemyMovement from './movement';

export default class Enemy {
  private body: EnemyBodySprite;
  private movement: EnemyMovement;

  constructor(game: Game, player: Player) {
    this.body = new EnemyBodySprite(game.spriteSheet, game.stage, game.renderer);
    this.movement = new EnemyMovement(this.body, player);
  }

  public update() {
    this.body.update();
    this.movement.update();
  }
}
