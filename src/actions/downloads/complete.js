import {
  message,
} from 'antd';
import fs from 'fs-extra';
import { resolve } from 'path';
import types from 'Root/actions';
import store from 'Root/store';
import db from 'Root/db';

export default async (id) => {
  store.dispatch({
    type: types.downloads.COMPLETE,
    id,
  });

  const toSave = store.getState().downloads.find(i => i.id === id);
  message.success(`${toSave.name} is completed.`);

  await fs.move(toSave.files[0].path, resolve(toSave.outputDir, toSave.name));

  db.get('downloads')
    .find({ id })
    .assign(toSave)
    .write();
};
