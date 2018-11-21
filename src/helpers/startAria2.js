import { spawn } from 'child_process';

import db from 'Root/db';

export default () => new Promise((resolve, reject) => {
  const { port } = db.get('config').value();
  const aria2PID = db.get('aria2').value();

  if (aria2PID) {
    return resolve();
  }


  const aria2 = spawn(
    'aria2c',
    ['--enable-rpc', `--rpc-listen-port=${port}`, '--rpc-listen-all', '--no-conf'],
    {
      shell: false,
    },
  );

  aria2.stdout.on('data', (data) => {
    if (data.includes('errorCode=')) {
      reject(data);
    }

    db.set('aria2', aria2.pid).write();
    resolve();
  });

  aria2.stderr.on('data', (data) => {
    reject(data);
  });

  aria2.on('close', (data) => {
    reject(data);
  });

  return 0;
});
