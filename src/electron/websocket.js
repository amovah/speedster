import socketio from 'socket.io';
import { app } from 'electron';
import store from 'Root/store';

export default () => {
  const io = socketio(store.getState().setting.port + 1);

  io.on('connection', () => {
    console.log('test');
  });

  app.on('before-quit', () => {
    io.close();
  });

  return io;
};
