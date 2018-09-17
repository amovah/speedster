import { app, BrowserWindow } from 'electron';
import { resolve } from 'path';
import { env } from 'process';
import { exec } from 'child_process';

import db from 'Root/db';

let win;

function stopAria2() {
  const pid = db.get('aria2').value();
  if (pid) {
    db.set('aria2', 0).write();
    exec(`kill -9 ${pid}`, [], { shell: false });
  }
}

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
    stopAria2();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopAria2();
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
