import store from 'Root/store';
import types from 'Root/actions';

export default (config) => {
  store.dispatch({
    type: types.LOAD,
    config,
  });
};
