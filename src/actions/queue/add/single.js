import { sync } from 'Root/db';
import resume from '../resume';
import add from './add';

export default async (id) => {
  add(id);

  await sync();

  resume();
};
