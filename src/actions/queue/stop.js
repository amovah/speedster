import { stop as stopStart } from './startJob';
import { stop as stopStop } from './stopJob';

export default () => {
  stopStart();
  stopStop();
};
