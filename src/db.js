import { resolve } from 'path';
import { homedir } from 'os';
import { remote } from 'electron';
import { readJson } from 'fs-extra';
import loadSetting from 'Root/actions/setting/load';
import loadDownloads from 'Root/actions/downloads/load';
import loadQueue from 'Root/actions/queue/load';
import { version } from '../package.json';

const dbPath = resolve(remote.app.getPath('appData'), 'speedster.db.json');

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

export async function load() {
  const db = await readJson(dbPath);

  loadSetting(db.setting);
  loadDownloads(db.downloads);
  loadQueue(db.queue);
}

export async function sync() {
  console.log('yea');
}

// const setting = db.get('setting').value();
// if (setting.version !== version) {
//   db.setState(defaults).write();
// }
