import 'babel-polyfill';
import { app, BrowserWindow, Menu } from 'electron';
import { resolve } from 'path';
import { env } from 'process';
import { load as loadDB } from 'Root/db';

// if (env.NODE_ENV === 'development') {
//   require('electron-reload')(resolve(__dirname, '..')); // eslint-disable-line
// }

let win;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 600,
    icon: resolve(__dirname, '../icons/256x256.png'),
    title: 'Speedster',
    show: false,
    nodeIntegration: false,
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

app.on('ready', async () => {
  await loadDB();

  createWindow();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


Menu.setApplicationMenu(Menu.buildFromTemplate([]));
