import { resolve } from 'path';

const { BrowserWindow } = require('electron').remote;

export default page => () => {
  let win = new BrowserWindow({
    width: 800,
    height: 400,
    title: 'Download',
  });
  win.loadFile(resolve(__dirname, '..', 'build', `${page}.html`));

  win.webContents.openDevTools();
};
