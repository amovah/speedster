import { app, BrowserWindow, Menu } from 'electron';
import { resolve } from 'path';
import { env } from 'process';

let win;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 600,
    title: 'Speedster',
  });

  win.loadURL(`file://${resolve(__dirname, 'index.html')}`);

  if (env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

Menu.setApplicationMenu(Menu.buildFromTemplate([]));
