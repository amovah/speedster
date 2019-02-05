import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { homedir } from 'os';
import { remote } from 'electron';
import { version } from '../package.json';

const adapter = new FileSync(resolve(remote.app.getPath('appData'), 'speedster.db.json'));
const db = lowdb(adapter);

const defaults = {
  setting: {
    port: 6812,
    url: 'http://localhost:6812/jsonrpc',
    downloaddir: resolve(homedir(), 'Downloads', 'Speedster'),
    version,
  },
  downloads: [
  ],
  queue: {
    status: false,
    startTime: '03:00:00',
    endTime: '06:00:00',
    isDownloading: false,
  },
};

db.defaults(defaults).write();

db.read();

// const setting = db.get('setting').value();
// if (setting.version !== version) {
//   db.setState(defaults).write();
// }

export default db;
