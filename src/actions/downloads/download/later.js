import uid from 'uuid/v4';
import { sync } from 'Root/db';
import store from 'Root/store';
import addDownload from '../add';

export default async () => {
  const { data, ...rest } = store.getState().form.addUrl.values;
  const download = {
    id: uid(),
    downloadStatus: 'suspend',
    ...data,
    ...rest,
  };

  addDownload(download);

  await sync();

  return download.id;
};
