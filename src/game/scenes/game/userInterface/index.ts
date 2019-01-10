import { extras } from 'pixi.js';
import { IScene, ISceneObject, IScore } from '../../../engine/interfaces';
import ResourceManager from '../../../engine/resourceManager';
import ToggleSound from './toggleSound';

export default class UserInterface implements ISceneObject {
  private scoreText: extras.BitmapText;
  private toggleSound: ToggleSound;

  constructor(private sceneScore: IScore) {
    this.toggleSound = new ToggleSound();
  }

  public async preload() {
    await ResourceManager.create('8bitFont', 'assets/fnt/8bit.xml');
    await this.toggleSound.preload();
  }

  public create(scene: IScene): void {
    this.scoreText = new extras.BitmapText(`Score:${this.sceneScore.score}`, {
      align: 'left',
      font: '48px 8bit',
    });
    this.scoreText.x = 20;
    this.scoreText.y = 20;
    scene.container.addChild(this.scoreText);

    this.toggleSound.create(scene);
  }

  public update() {
    this.scoreText.text = `Score:${this.sceneScore.score}`;
    this.toggleSound.update();
  }
}
