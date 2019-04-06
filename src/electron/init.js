import { resolve } from 'path';
import { ensureDir } from 'fs-extra';
import store from 'Root/store';
import { load as loadDB } from 'Root/db';
import categories from 'Root/categories';
import startAria2 from 'Root/helpers/startAria2';
import statusUpdater from 'Root/helpers/statusUpdater';

export default async () => {
  await loadDB();

  const downloadDir = store.getState().setting.downloadDir;
  const ensures = [];
  for (const category of categories) {
    ensures.push(ensureDir(resolve(downloadDir, category.name)));
  }
  await Promise.all(ensures);

  await startAria2();
  statusUpdater();
};
