import io from 'socket.io-client';
import { message } from 'antd';
import store from 'Root/store';

const socket = io(`http://localhost:${store.getState().setting.port + 1}`);

socket.on('complete', (name) => {
  message.success(`${name} download is done.`);
});

socket.on('fail', (name) => {
  message.error(`${name} download went wrong.`);
});
