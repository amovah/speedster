import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';

const adapter = new FileSync(resolve(__dirname, 'database.json'));
const db = lowdb(adapter);

db.defaults({
  config: {
    port: 6812,
    url: 'http://localhost:6812/jsonrpc',
  },
}).write();

db.read();

export default db;
