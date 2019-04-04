import { resolve } from 'path';
import { ensureDir } from 'fs-extra';
import store from 'Root/store';
import { load as loadDB } from 'Root/db';
import categories from 'Root/categories';

export default async () => {
  await loadDB();

  const downloadDir = store.getState().setting.downloadDir;
  const ensures = [];
  for (const category of categories) {
    ensures.push(ensureDir(resolve(downloadDir, category.name)));
  }
  await Promise.all(ensures);
};
