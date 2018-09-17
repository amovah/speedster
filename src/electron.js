import { app, BrowserWindow } from 'electron';
import { resolve } from 'path';
import { env } from 'process';

let win;

// function closeAria2() {
//
// }

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Speedster',
  });

  win.loadFile(resolve(__dirname, 'index.html'));

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
