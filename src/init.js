import startAria2 from 'Root/helpers/startAria2';
import history from 'Root/history';
import db from 'Root/db';
import { resolve } from 'path';
import { ensureDir } from 'fs-extra';

export default async () => {
  await startAria2();

  const config = db.get('config').value();
  const categories = db.get('categories').value();
  const ensures = [];
  for (const category of categories) {
    ensures.push(ensureDir(resolve(config.downloaddir, category.name)));
  }
  await Promise.all(ensures);

  history.push('/');
};
