import socketio from 'socket.io';
import { app } from 'electron';
import store from 'Root/store';

export default (getWindow, createWindow) => {
  const io = socketio(store.getState().setting.port + 1);

  app.on('before-quit', () => {
    io.close();
  });

  io.of('extension').on('connect', (socket) => {
    socket.on('download', (url) => {
      const win = getWindow();

      if (!win) {
        io.of('client').once('connect', (innerSocket) => {
          innerSocket.emit('download', url);
        });

        createWindow();
      } else {
        io.of('client').emit('download', url);
        win.focus();
      }
    });
  });

  io.of('client');

  return io;
};
