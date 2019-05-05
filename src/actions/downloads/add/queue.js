import addToQueue from 'Root/actions/queue/add/single';
import later from './later';

export default async () => {
  const id = await later();
  await addToQueue(id);

  return id;
};
