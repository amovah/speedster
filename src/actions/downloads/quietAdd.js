import uid from 'uuid/v4';
import types from 'Root/actions';
import { sync } from 'Root/db';
import store from 'Root/store';

export default async () => {
  const { data, ...rest } = store.getState().form.addUrl.values;
  const download = {
    id: uid(),
    downloadStatus: 'suspend',
    ...data,
    ...rest,
  };

  store.dispatch({
    type: types.downloads.ADD,
    download,
  });

  await sync();

  return download.id;
};
