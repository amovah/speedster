import AutoLaunch from 'auto-launch';
import store from 'Root/store';

const speedsterLauncher = new AutoLaunch({
  name: 'Speedster',
});

export function init() {
  if (store.getState().setting.autoLaunch) {
    speedsterLauncher.isEnabled().then((isEnabled) => {
      if (!isEnabled) {
        speedsterLauncher.enable();
      }
    });
  }
}

export function enable() {
  speedsterLauncher.enable();
}

export function disable() {
  speedsterLauncher.disable();
}
