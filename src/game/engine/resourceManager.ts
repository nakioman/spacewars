import { loaders, Texture } from 'pixi.js';
import { IDictionary } from './interfaces';

export default class ResourceManager {
  public static async create(name: string, url: string) {
    return new Promise<loaders.Resource>((resolve) => {
      if (this.loader.resources[name]) {
        resolve(this.loader.resources[name]);
      }
      this.loader.add(name, url).load(() => {
        resolve(this.loader.resources[name]);
      });
    });
  }

  public static textureFromImage(imageUrl: string) {
    if (ResourceManager.textures[imageUrl]) {
      return ResourceManager.textures[imageUrl];
    } else {
      const texture = Texture.fromImage(imageUrl);
      ResourceManager.textures[imageUrl] = texture;
      return texture;
    }
  }

  private static readonly loader = new loaders.Loader();
  private static readonly textures: IDictionary = {};
}
