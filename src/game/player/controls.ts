import Key from './key';

export default class Controls {
  public pressed: { [index: number]: boolean };

  constructor() {
    this.pressed = {};
  }

  public isMovingRight(): any {
    return this.isDown(Key.Right) || this.isDown(Key.D);
  }

  public isMovingLeft(): any {
    return this.isDown(Key.Left) || this.isDown(Key.A);
  }

  public isMovingDown(): any {
    return this.isDown(Key.Down) || this.isDown(Key.S);
  }

  public isMovingUp(): any {
    return this.isDown(Key.Up) || this.isDown(Key.W);
  }

  public onKeyDown(event: KeyboardEvent) {
    this.pressed[event.keyCode] = true;
  }

  public onKeyUp(event: KeyboardEvent) {
    delete this.pressed[event.keyCode];
  }

  private isDown(keyCode: Key) {
    return this.pressed[keyCode];
  }
}
