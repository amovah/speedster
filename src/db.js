import { resolve } from 'path';
import { homedir } from 'os';
import electron from 'electron';
import { readJson, pathExists, outputJson } from 'fs-extra';
import loadSetting from 'Root/actions/setting/load';
import loadDownloads from 'Root/actions/downloads/load';
import loadQueue from 'Root/actions/queue/load';
import store from 'Root/store';

const app = electron.remote?.app || electron.app;
const dbPath = resolve(app.getPath('appData'), 'speedster.db.json');

const defaults = {
  setting: {
    port: 6812,
    socketPort: 6813,
    url: 'http://localhost:6812/jsonrpc',
    downloadDir: resolve(homedir(), 'Downloads', 'Speedster'),
    autoLaunch: true,
  },
  downloads: [
  ],
  queue: {
    status: false,
    startTime: '03:00:00',
    endTime: '06:00:00',
    isDownloading: false,
  },
  dbVersion: '1.0.0',
};

export async function load() {
  let db;

  const exist = await pathExists(dbPath);
  if (!exist) {
    await outputJson(dbPath, defaults);
    db = defaults;
  } else {
    db = await readJson(dbPath);

    if (db.dbVersion !== defaults.dbVersion) {
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
    dbVersion: defaults.dbVersion,
  });
}
