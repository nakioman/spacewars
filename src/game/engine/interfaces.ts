import { Container, Texture } from 'pixi.js';
import Viewport from './viewport';

export interface IScene {
  viewport: Viewport;
  container: Container;

  preload(): Promise<void>;
  create(): void;
  update(): void;
}

export interface ISceneObject {
  preload(): Promise<void>;
  create(scene: IScene): void;
  update(): void;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IDictionary {
  [index: string]: Texture;
}

export interface IHitArea {
  containsPoint(x: number, y: number): boolean;
}

export interface IDestroy {
  destroy(): void;
}

export interface IShootable {
  health: number;
  hit(x: number, y: number): boolean;
}

export interface IScore {
  score: number;
}
