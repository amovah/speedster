import { app, BrowserWindow, Menu } from 'electron';
import { resolve } from 'path';
import { env } from 'process';

let win;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 600,
    icon: resolve(__dirname, '../icons/256x256.png'),
    title: 'Speedster',
    show: false,
    nodeIntegration: true,
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

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

Menu.setApplicationMenu(Menu.buildFromTemplate([]));
