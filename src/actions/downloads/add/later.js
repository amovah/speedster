import { v4 as uid } from 'uuid';
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
