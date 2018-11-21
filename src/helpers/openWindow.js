import { BrowserWindow } from 'electron';

export default page => {

}
let win = new BrowserWindow({
  width: 800,
  height: 400,
});

win.loadURL('http://www.google.com');
