import { resolve } from 'path';
import { homedir } from 'os';
import electron from 'electron';
import { readJson, pathExists, outputJson } from 'fs-extra';
import loadSetting from 'Root/actions/setting/load';
import loadDownloads from 'Root/actions/downloads/load';
import loadQueue from 'Root/actions/queue/load';
import store from 'Root/store';
import { version } from '../package.json';

const app = electron.remote?.app || electron.app;
const dbPath = resolve(app.getPath('appData'), 'speedster.db.json');

const defaults = {
  setting: {
    port: 6812,
    socketPort: 6813,
    url: 'http://localhost:6812/jsonrpc',
    downloadDir: resolve(homedir(), 'Downloads', 'Speedster'),
  },
  downloads: [
  ],
  queue: {
    status: false,
    startTime: '03:00:00',
    endTime: '06:00:00',
    isDownloading: false,
  },
  version,
};
export async function load() {
  let db;

  const exist = await pathExists(dbPath);
  if (!exist) {
    await outputJson(dbPath, defaults);
    db = defaults;
  } else {
    db = await readJson(dbPath);

    if (db.version.split('.')[0] !== version.split('.')[0]) {
      await outputJson(dbPath, defaults);
      db = defaults;
    }
  }

  loadSetting(db.setting);
  loadDownloads(db.downloads);
  loadQueue(db.queue);
}

export async function sync() {
  const state = store.getState();

  await outputJson(dbPath, {
    setting: state.setting,
    downloads: state.downloads,
    queue: state.queue,
    version,
  });
}
