import types from 'Root/actions';
import store from 'Root/store';

export default (downloads) => {
  store.dispatch({
    type: types.downloads.LOAD,
    downloads,
  });
};
