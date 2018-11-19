import Player from '../player';
import EnemyBodySprite from './bodySprite';

export default class CollisionDetection {
  constructor(private body: EnemyBodySprite, private player: Player) {}

  public update(): void {
    if (this.player.containsPoint(this.body.x, this.body.y)) {
      this.player.destroy();
    }
  }
}
