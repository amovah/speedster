import later from './later';
import addToQueue from '../queue/single';

export default async () => {
  const id = await later();
  await addToQueue(id);

  return id;
};
