import store from 'Root/store';
import types from 'Root/actions';

export default (setting) => {
  store.dispatch({
    type: types.setting.LOAD,
    setting,
  });
};
