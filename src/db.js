import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { homedir } from 'os';

const adapter = new FileSync(resolve(__dirname, 'database.json'));
const db = lowdb(adapter);

db.defaults({
  config: {
    port: 6812,
    url: 'http://localhost:6812/jsonrpc',
    downloaddir: resolve(homedir(), 'Downloads', 'Speedster'),
  },
  categories: [
    {
      name: 'Compressed',
      extensions: [
        '.tar.gz',
        '.rar',
        '.zip',
      ],
    },
    {
      name: 'Music',
      extensions: [
        '.mp3',
      ],
    },
  ],
}).write();

db.read();

export default db;
