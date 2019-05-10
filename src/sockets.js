import io from 'socket.io-client';
import store from 'Root/store';

const socket = io(`http://localhost:${store.getState().setting.port + 1}`);
