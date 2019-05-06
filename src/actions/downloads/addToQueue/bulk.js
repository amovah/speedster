import { sync } from 'Root/db';
import resume from 'Root/actions/queue/resume';
import bulkUpdate from '../update/bulk';

export default async (ids) => {
  bulkUpdate(ids, {
    queue: true,
  });

  await sync();

  resume();
};
