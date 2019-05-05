import { sync } from 'Root/db';
import remove from './remove';

export default async (id) => {
  remove(id);

  await sync();
};
