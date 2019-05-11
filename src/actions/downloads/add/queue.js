import addToQueue from '../addToQueue/single';
import later from './later';

export default async (values) => {
  const id = await later(values);
  await addToQueue(id);

  return id;
};
