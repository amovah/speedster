import { sync } from 'Root/db';
import update from '../update/single';

export default async (id) => {
  update(id, {
    downloadStatus: 'suspend',
  });

  await sync();
};
