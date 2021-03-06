import { resolve, extname } from 'path';
import { change } from 'redux-form';
import store from 'Root/store';
import categories from 'Root/categories';
import fetch from './fetch';

const sleep = time => new Promise(res => setTimeout(res, time));

export default async (url) => {
  const gid = await fetch({
    method: 'aria2.addUri',
    params: [
      [
        url,
      ],
      {
        'dry-run': 'true',
      },
    ],
  });

  if (!gid) {
    return null;
  }

  let count = 10;

  while (count > 0) {
    const res = await fetch({
      method: 'aria2.tellStatus',
      params: [
        gid.result,
      ],
    });

    if (res.result.errorCode === '3') {
      return null;
    }

    if (res && parseInt(res.result.completedLength, 10) > 0) {
      const modified = { ...res.result };

      modified.completedLength = '0';
      delete modified.gid;

      modified.name = modified.files[0].path.split('/').slice(-1)[0];

      let category;
      for (const cate of categories) {
        if (cate.extensions.includes(extname(modified.name).toLowerCase())) {
          category = cate.name;
        }
      }
      if (!category) {
        category = 'Others';
      }
      modified.category = category;

      modified.outputDir = resolve(store.getState().setting.downloadDir, category);

      store.dispatch(change('addUrl', 'data', modified));
      store.dispatch(change('addUrl', 'maxConnection', 16));
      store.dispatch(change('addUrl', 'outputDir', modified.outputDir));
      store.dispatch(change('addUrl', 'maxSpeed', null));

      return modified;
    }

    await sleep(500);
    count = count - 1;
  }

  return null;
};
