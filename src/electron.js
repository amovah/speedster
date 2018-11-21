import { app, BrowserWindow } from 'electron';
import { resolve } from 'path';
import { env } from 'process';

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Speedster',
  });

  win.loadURL(`file://${resolve(__dirname, 'index.html#/initializing')}`);

  if (env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
