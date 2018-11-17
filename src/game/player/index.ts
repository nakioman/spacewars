import Game from '../game';
import PlayerBodySprite from './bodySprite';
import PlayerMovement from './movement';
import Shooting from './shooting';

export default class Player {
  private body: PlayerBodySprite;
  private playerMovement: PlayerMovement;
  private shooting: Shooting;

  constructor(x: number, y: number, game: Game) {
    this.body = new PlayerBodySprite(x, y, game.spriteSheet, game.stage);
    this.playerMovement = new PlayerMovement(this.body, game.renderer);
    this.shooting = new Shooting(game.renderer, game.spriteSheet, this.body, game.stage);
  }

  public update(): void {
    this.playerMovement.update();
    this.shooting.update();
  }
}
