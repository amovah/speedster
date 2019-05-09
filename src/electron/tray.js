import { Tray, Menu } from 'electron';
import { resolve } from 'path';

let tray = null;
export default (getWindow, createWindow) => {
  tray = new Tray(resolve(__dirname, '..', 'icons', '256x256.png'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      type: 'normal',
      click() {
        const win = getWindow();
        if (win) {
          if (win.isMinimized()) {
            win.restore();
          }
          win.focus();
        } else {
          createWindow();
        }
      },
    },
  ]);

  tray.setToolTip('Speedster');
  tray.setContextMenu(contextMenu);
};
