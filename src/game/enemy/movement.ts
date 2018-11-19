import Player from '../player';
import EnemyBodySprite from './bodySprite';

const enemySpeed: number = 3;

export default class EnemyMovement {
  constructor(private enemy: EnemyBodySprite, private player: Player) {}

  public update(): void {
    const dx = this.player.x - this.enemy.x;
    const dy = this.player.y - this.enemy.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len > 1) {
      this.enemy.x += (dx / len) * enemySpeed;
      this.enemy.y += (dy / len) * enemySpeed;
    }
  }
}
