import later from './later';
import addToQueue from '../addToQueue/single';

export default async () => {
  const id = await later();
  await addToQueue(id);

  return id;
};
