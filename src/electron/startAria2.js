import { spawn } from 'child_process';
import store from 'Root/store';

export default () => new Promise(async (resolve, reject) => {
  const aria2 = spawn(
    `${__dirname}/aria2c`,
    [
      '--enable-rpc',
      `--rpc-listen-port=${store.getState().setting.port}`,
      '--rpc-listen-all',
      '--no-conf',
    ],
  );

  aria2.stdout.on('data', (data) => {
    if (data.includes('errorCode=')) {
      reject(data.toString());
    }

    resolve();
  });

  aria2.stderr.on('data', (data) => {
    reject(data.toString());
  });

  aria2.on('close', (data) => {
    reject(data.toString());
  });
});
