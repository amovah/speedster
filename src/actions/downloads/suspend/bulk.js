import { sync } from 'Root/db';
import bulkUpdate from '../update/bulk';

export default async (ids) => {
  bulkUpdate(ids, {
    downloadStatus: 'suspend',
  });

  await sync();
};
