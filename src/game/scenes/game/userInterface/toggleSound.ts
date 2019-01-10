import { loaders, Sprite, Texture } from 'pixi.js';
import { IScene, ISceneObject } from '../../../engine/interfaces';
import ResourceManager from '../../../engine/resourceManager';
import Settings from '../../../engine/settings';
import Viewport from '../../../engine/viewport';

const soundOnTextureName: string = 'Sound/On.png';
const soundOffTextureName: string = 'Sound/Off.png';

export default class ToggleSound implements ISceneObject {
  private button: Sprite;
  private spriteSheet: loaders.Resource;
  private soundOnTexture: Texture;
  private soundOffTexture: Texture;

  public async preload() {
    this.spriteSheet = await ResourceManager.create('gameSheet', 'assets/img/sheet.json');
    this.soundOnTexture = this.spriteSheet.textures[soundOnTextureName];
    this.soundOffTexture = this.spriteSheet.textures[soundOffTextureName];
  }

  public create(scene: IScene) {
    this.button = new Sprite();
    this.button.texture = Settings.soundOn ? this.soundOnTexture : this.soundOffTexture;
    this.button.height = 64;
    this.button.width = 64;
    this.button.tint = 0xffffff;
    this.button.x = Viewport.width - this.button.width - 20;
    this.button.y = 10 + this.button.height / 2;
    this.button.interactive = true;
    this.button.buttonMode = true;
    this.button.on('pointerdown', this.toggleSound);
    scene.container.addChild(this.button);
  }

  public toggleSound = () => {
    Settings.soundOn = !Settings.soundOn;
    this.button.texture = Settings.soundOn ? this.soundOnTexture : this.soundOffTexture;
  }

  public update(): void {
    return;
  }
}
