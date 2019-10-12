import { resolve } from 'path';
import { ensureDir } from 'fs-extra';
import store from 'Root/store';
import { init as autoLaunch } from 'Root/autoLaunch';
import { load as loadDB } from 'Root/db';
import categories from 'Root/categories';
import bulkSuspend from 'Root/actions/downloads/suspend/bulk';
import statusUpdater from './statusUpdater';
import startAria2 from './startAria2';
import { start as startWebSocket } from './websocket';

export default async (...params) => {
  await loadDB();
  autoLaunch();

  const actions = [];

  const state = store.getState();
  for (const category of categories) {
    actions.push(ensureDir(resolve(state.setting.downloadDir, category.name)));
  }

  await startAria2();

  actions.push(bulkSuspend(
    state
      .downloads
      .filter(i => ['downloading', 'pause'].includes(i.downloadStatus))
      .map(i => i.id),
  ));

  await Promise.all(actions);

  startWebSocket(...params);
  statusUpdater();
};
