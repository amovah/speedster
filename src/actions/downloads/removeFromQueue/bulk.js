import { sync } from 'Root/db';
import bulkUpdate from '../update/bulk';

export default async (ids) => {
  bulkUpdate(ids, {
    queue: false,
  });

  await sync();
};
