import Key from './key';

export default class Controls {
  public pressed: { [index: number]: boolean };

  constructor() {
    this.pressed = {};
  }

  public isAnyKeyPressed(): boolean {
    return (
      this.isMovingRight() || this.isMovingLeft() || this.isMovingUp() || this.isMovingDown()
    );
  }

  public isMovingRight(): boolean {
    return this.isDown(Key.Right) || this.isDown(Key.D);
  }

  public isMovingLeft(): boolean {
    return this.isDown(Key.Left) || this.isDown(Key.A);
  }

  public isMovingDown(): boolean {
    return this.isDown(Key.Down) || this.isDown(Key.S);
  }

  public isMovingUp(): boolean {
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
