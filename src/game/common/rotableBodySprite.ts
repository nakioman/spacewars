import BodySprite from './bodySprite';

export default class RotableBodySprite extends BodySprite {
  public update(): void {
    this.body.rotation += 0.01;
  }
}
