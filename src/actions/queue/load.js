import types from 'Root/actions';
import store from 'Root/store';

export default (queue) => {
  store.dispatch({
    type: types.queue.LOAD,
    queue,
  });
};
