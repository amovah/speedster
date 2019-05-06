import { resolve } from 'path';
import { ensureDir } from 'fs-extra';
import store from 'Root/store';
import { load as loadDB } from 'Root/db';
import categories from 'Root/categories';
import startAria2 from 'Root/helpers/startAria2';
import statusUpdater from 'Root/helpers/statusUpdater';
import bulkSuspend from 'Root/actions/downloads/suspend/bulk';

export default async () => {
  await loadDB();

  const actions = [];

  const state = store.getState();
  for (const category of categories) {
    actions.push(ensureDir(resolve(state.setting.downloadDir, category.name)));
  }

  actions.push(startAria2());

  actions.push(bulkSuspend(
    state
      .downloads
      .filter(i => ['downloading', 'pause'].includes(i.downloadStatus))
      .map(i => i.id),
  ));

  await Promise.all(actions);

  statusUpdater();
};
