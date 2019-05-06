import { sync } from 'Root/db';
import resume from 'Root/actions/queue/resume';
import update from '../update/single';

export default async (id) => {
  update(id, {
    queue: true,
  });

  await sync();

  resume();
};
