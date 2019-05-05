import { sync } from 'Root/db';
import addToQueue from './add';

export default async (id) => {
  addToQueue(id);

  await sync();
};
