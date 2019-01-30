import types from 'Root/actions';
import store from 'Root/store';

export default (current) => {
  store.dispatch({
    type: types.activeMenu.CHANGE,
    current,
  });
};
