import { sync } from 'Root/db';
import bulkUpdate from '../update/bulk';

export default async (ids) => {
  console.log(ids);
  bulkUpdate(ids, {
    downloadStatus: 'suspend',
  });

  await sync();
};
