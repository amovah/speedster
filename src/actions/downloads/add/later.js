import uid from 'uuid/v4';
import { sync } from 'Root/db';
import addDownload from './add';

export default async (values) => {
  const download = {
    id: uid(),
    downloadStatus: 'suspend',
    ...values,
  };

  addDownload(download);

  await sync();

  return download.id;
};
