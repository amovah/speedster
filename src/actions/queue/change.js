import types from 'Root/actions';
import store from 'Root/store';

export default (toChange) => {
  store.dispatch({
    type: types.queue.CHANGE,
    toChange,
  });
};
