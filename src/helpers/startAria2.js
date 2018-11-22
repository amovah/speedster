import { spawn } from 'child_process';

import db from 'Root/db';
import fetch from 'Root/helpers/fetch';

export default () => new Promise(async (resolve, reject) => {
  const res = await fetch({
    method: 'aria2.getGlobalOption',
  });

  if (res && res.status === 200) {
    resolve();
    return;
  }

  const { port } = db.get('config').value();

  const aria2 = spawn(
    'aria2c',
    ['--enable-rpc', `--rpc-listen-port=${port}`, '--rpc-listen-all', '--no-conf'],
    {
      shell: false,
    },
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
