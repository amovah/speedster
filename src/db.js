import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { homedir } from 'os';
import { remote } from 'electron';
import uid from 'uuid/v4';

const adapter = new FileSync(resolve(remote.app.getPath('appData'), 'speedster.db.json'));
const db = lowdb(adapter);

db.defaults({
  setting: {
    port: 6812,
    url: 'http://localhost:6812/jsonrpc',
    downloaddir: resolve(homedir(), 'Downloads', 'Speedster'),
  },
  categories: [
    {
      id: uid(),
      name: 'Compresseds',
      extensions: [
        '.gz',
        '.rar',
        '.zip',
      ],
    },
    {
      id: uid(),
      name: 'Musics',
      extensions: [
        '.mp3',
      ],
    },
    {
      id: uid(),
      name: 'Pictures',
      extensions: [
        '.jpg',
      ],
    },
    {
      id: uid(),
      name: 'Documents',
      extensions: [
        '.pdf',
      ],
    },
    {
      id: uid(),
      name: 'Videos',
      extensions: [
        '.mp4',
      ],
    },
    {
      id: uid(),
      name: 'Others',
      extensions: [],
    },
  ],
  downloads: [
  ],
}).write();

db.read();

export default db;
