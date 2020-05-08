import { exec } from 'child_process';
import store from 'Root/store';

export default () => new Promise(async (resolve, reject) => {
  exec(
    `aria2c --daemon --enable-rpc --rpc-listen-port=${store.getState().setting.port} --rpc-listen-all --no-conf`,
    (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve();
      }
    },
  );
});
