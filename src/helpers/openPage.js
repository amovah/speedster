import { resolve } from 'path';

const { BrowerWindow } = require('electron').remote;

export default (page) => {
  const win = new BrowerWindow({
    width: 800,
    height: 600,
  });

  win.loadURL(`file://${resolve(__dirname, `index.html#${page}`)}`);
};
