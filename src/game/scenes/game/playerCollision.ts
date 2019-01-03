import GameScene from '.';
import { IPosition, IShootable } from '../../engine/interfaces';

export default class PlayerCollision {
  private isDeadBackingField: boolean = false;

  public get isDead(): boolean {
    return this.isDeadBackingField;
  }

  constructor(private scene: GameScene) {}

  public update() {
    this.scene.enemies.forEach((enemy: IPosition & IShootable) => {
      const collides = this.scene.player.containsPoint(enemy.x, enemy.y);
      if (collides && enemy.health > 0) {
        this.isDeadBackingField = true;
        this.scene.player.destroy();
      }
    });
  }
}
