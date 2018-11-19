import { SystemRenderer } from 'pixi.js';
import PlayerBodySprite from './bodySprite';
import Controls from './controls';
import Status from './status';

export default class PlayerMovement {
  private readonly playerSpeed = 2.5;
  private controls: Controls = new Controls();

  constructor(
    private body: PlayerBodySprite,
    private status: Status,
    private renderer: SystemRenderer,
  ) {
    window.addEventListener('keyup', (event) => this.controls.onKeyUp(event), false);
    window.addEventListener('keydown', (event) => this.controls.onKeyDown(event), false);
  }

  public update() {
    if (this.status.health === 0) {
      return;
    }

    let x = this.body.x;
    let y = this.body.y;

    if (this.controls.isMovingUp()) {
      y -= this.playerSpeed;
    }
    if (this.controls.isMovingDown()) {
      y += this.playerSpeed;
    }
    if (this.controls.isMovingLeft()) {
      x -= this.playerSpeed;
    }
    if (this.controls.isMovingRight()) {
      x += this.playerSpeed;
    }

    if (y < 0) {
      y = this.renderer.height;
    } else if (y > this.renderer.height) {
      y = 0;
    }

    if (x < 0) {
      x = this.renderer.width;
    } else if (x > this.renderer.width) {
      x = 0;
    }

    let dx = x - this.body.x;
    let dy = this.body.y - y;
    const len = Math.sqrt(dx * dx + dy * dy);

    dx /= len ? len : 1.0;
    dy /= len ? len : 1.0;

    this.body.x = x;
    this.body.y = y;
    this.body.rotation = Math.atan2(dx, dy);
  }
}
