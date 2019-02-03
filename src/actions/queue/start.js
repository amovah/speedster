import { start as startStart } from './startJob';
import { start as startStop } from './stopJob';
import change from './change';

export default () => {
  startStart();
  startStop();
  change({
    status: true,
  });
};
