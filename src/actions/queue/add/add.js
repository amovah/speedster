import types from 'Root/actions';
import store from 'Root/store';

export default (id) => {
  store.dispatch({
    type: types.queue.ADD,
    id,
  });
};
