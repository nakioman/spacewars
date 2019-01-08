import Viewport from '../../../engine/viewport';
import BodySprite from '../common/bodySprite';
import Controls from './controls';

export default class PlayerMovement {
  private readonly playerSpeed = 2.5;
  private controls: Controls = new Controls();

  constructor(private body: BodySprite) {
    window.addEventListener('keyup', (event) => this.controls.onKeyUp(event), false);
    window.addEventListener('keydown', (event) => this.controls.onKeyDown(event), false);
  }

  public update() {
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
      y = Viewport.height;
      // y = this.renderer.height;
    } else if (y > Viewport.height) {
      y = 0;
    }

    if (x < 0) {
      x = Viewport.width;
    } else if (x > Viewport.width) {
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
