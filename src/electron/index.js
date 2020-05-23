import '@babel/polyfill';
import {
  app,
  BrowserWindow,
  Menu,
  dialog,
} from 'electron';
import { resolve } from 'path';
import { env } from 'process';
import elemon from 'elemon';
import shutdown from 'Root/helpers/shutdown';
import init from './init';
import tray from './tray';

app.allowRendererProcessReuse = true;

let win;
function createWindow() {
  win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 600,
    icon: resolve(__dirname, '../icons/512x512.png'),
    title: 'Speedster',
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.loadURL(`file://${resolve(__dirname, 'index.html')}`);

  if (env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });

  win.once('ready-to-show', () => {
    win.show();
  });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      }
      win.focus();
    }
  });

  app.on('ready', async () => {
    try {
      await init(() => win, createWindow);

      tray(() => win, createWindow);

      if (env.NODE_ENV === 'development') {
        createWindow();

        elemon({
          app,
          mainFile: 'build/electron.js',
          bws: [
            {
              bw: win, res: ['index.html', 'app.js'],
            },
          ],
        });
      }
    } catch (e) {
      dialog.showErrorBox(
        'Error while initializing speedster',
        e.toString(),
      );
      await shutdown();
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {});

  Menu.setApplicationMenu(Menu.buildFromTemplate([]));
}
