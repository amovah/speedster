import { resolve } from 'path';
import { ensureDir } from 'fs-extra';
import store from 'Root/store';
import { load as loadDB, sync } from 'Root/db';
import categories from 'Root/categories';
import startAria2 from 'Root/helpers/startAria2';
import statusUpdater from 'Root/helpers/statusUpdater';
import suspend from 'Root/actions/downloads/suspend';

export default async () => {
  await loadDB();

  const state = store.getState();
  const ensures = [];
  for (const category of categories) {
    ensures.push(ensureDir(resolve(state.setting.downloadDir, category.name)));
  }
  await Promise.all(ensures);

  await startAria2();

  const actions = [];
  for (const download of state.downloads) {
    if (download.downloadStatus === 'downloading') {
      actions.push(suspend(download.id, false));
    }
  }
  await Promise.all(actions);
  await sync();

  statusUpdater();
};
