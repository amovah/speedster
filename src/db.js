import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { homedir } from 'os';
import { remote } from 'electron';

const adapter = new FileSync(resolve(remote.app.getPath('appData'), 'speedster.db.json'));
const db = lowdb(adapter);

db.defaults({
  setting: {
    port: 6812,
    url: 'http://localhost:6812/jsonrpc',
    downloaddir: resolve(homedir(), 'Downloads', 'Speedster'),
  },
  downloads: [
  ],
}).write();

db.read();

export default db;
