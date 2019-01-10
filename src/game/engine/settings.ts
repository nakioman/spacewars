import { Howler } from 'howler';

const spaceWarsSoundOn = 'spacewars_soundOn';

export default class Settings {
  public static initialize() {
    Settings.setupDefaults();
    Howler.mute(!Settings.soundOn);
  }

  private static setupDefaults() {
    if (!localStorage.getItem(spaceWarsSoundOn)) {
      localStorage.setItem(spaceWarsSoundOn, 'true');
    }
  }

  public static get soundOn() {
    const soundOn = localStorage.getItem(spaceWarsSoundOn);
    return soundOn === 'true';
  }

  public static set soundOn(value: boolean) {
    localStorage.setItem(spaceWarsSoundOn, value.toString());
    Howler.mute(!value);
  }
}
