import { app, BrowserWindow } from 'electron';
import { resolve } from 'path';

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Speedster',
  });

  win.loadFile(resolve(__dirname, 'index.html'));

  win.webContents.openDevTools();

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
