import socketio from 'socket.io';
import { app } from 'electron';
import store from 'Root/store';
import changeSetting from 'Root/actions/setting/change';

let engine;

function bind(getWindow, createWindow, port) {
  function closeWebsocket(io) {
    return () => {
      io.close();
    };
  }

  const io = socketio(port);

  app.on('before-quit', closeWebsocket(io));

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

    socket.on('change-port', (newPort) => {
      changeSetting({
        socketPort: newPort,
      });

      bind(getWindow, createWindow, newPort);

      app.off('before-quit', closeWebsocket);

      io.close();
    });
  });

  io.of('client');

  engine = io;
}

export const start = (getWindow, createWindow) => {
  bind(
    getWindow,
    createWindow,
    store.getState().setting.socketPort,
  );
};

export const getIO = () => engine;
