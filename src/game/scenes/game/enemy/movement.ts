import { IPosition } from '../../../engine/interfaces';
import BodySprite from '../common/bodySprite';

const enemySpeed: number = 2;

export default class EnemyMovement {
  constructor(private enemy: BodySprite, private playerPosition: IPosition) {}

  public update(): void {
    const dx = this.playerPosition.x - this.enemy.x;
    const dy = this.playerPosition.y - this.enemy.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len > 1) {
      this.enemy.x += (dx / len) * enemySpeed;
      this.enemy.y += (dy / len) * enemySpeed;
    }
  }
}
