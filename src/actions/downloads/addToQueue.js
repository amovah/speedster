import quietAdd from './quietAdd';
import moveToQueue from './moveToQueue';

export default async (downloadInfo, details) => {
  const id = await quietAdd(downloadInfo, details);
  moveToQueue(id);
};
