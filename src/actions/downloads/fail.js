import { sync } from 'Root/db';
import update from './update';

export default async (id) => {
  update(id, {
    downloadStatus: 'failed',
  });

  await sync();
};
