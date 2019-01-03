import { Container, SystemRenderer } from 'pixi.js';

export default class Viewport {
  public static width = 1920;
  public static height = 1080;
  public readonly mainContainer: Container = new Container();

  public get centerX(): number {
    return Viewport.width / 2;
  }

  public get centerY(): number {
    return Viewport.height / 2;
  }

  constructor(private renderer: SystemRenderer, stage: Container) {
    stage.addChild(this.mainContainer);
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    this.onWindowResize();
  }

  private onWindowResize() {
    const scaleFactor = Math.min(
      window.innerWidth / Viewport.width,
      window.innerHeight / Viewport.height,
    );
    const newWidth = Math.ceil(Viewport.width * scaleFactor);
    const newHeight = Math.ceil(Viewport.height * scaleFactor);

    this.renderer.view.style.width = `${newWidth}px`;
    this.renderer.view.style.height = `${newHeight}px`;

    this.renderer.resize(newWidth, newHeight);
    this.mainContainer.scale.set(scaleFactor);
  }
}
