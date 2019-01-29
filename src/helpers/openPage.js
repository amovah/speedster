import { resolve } from 'path';

const { BrowserWindow } = require('electron').remote;

export default (page) => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Add URL',
  });

  win.on('closed', () => {
    win = null;
  });

  win.loadURL(`file://${resolve(__dirname, `index.html#${page}`)}`);
};
