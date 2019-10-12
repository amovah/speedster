import io from 'socket.io-client';
import { message } from 'antd';
import { change } from 'redux-form';
import { env } from 'process';
import store from 'Root/store';
import history from 'Root/history';

const socket = io(`http://localhost:${store.getState().setting.socketPort}/client`);

socket.on('complete', (name) => {
  message.success(`${name} download is done.`);
});

socket.on('fail', (name) => {
  message.error(`${name} download went wrong.`);
});

socket.on('download', (url) => {
  store.dispatch(change('addUrl', 'url', url));
  history.push('/add-url');
});

if (env.NODE_ENV === 'development') {
  global.socket = socket;
}
