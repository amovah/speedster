import { sync } from 'Root/db';
import moveToQueue from '../moveToQueue';

export default async (id) => {
  moveToQueue(id);

  await sync();
};
