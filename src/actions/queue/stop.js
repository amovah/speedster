import { stop as stopStart } from './startJob';
import { stop as stopStop } from './stopJob';
import change from './change';

export default () => {
  stopStart();
  stopStop();
  change({
    status: false,
  });
};
