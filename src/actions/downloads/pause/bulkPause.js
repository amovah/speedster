import types from 'Root/actions';
import store from 'Root/store';

export default (ids) => {
  store.dispatch({
    type: types.downloads.BULK_PAUSE,
    ids,
  });
};
