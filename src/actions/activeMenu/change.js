import types from 'Root/actions';
import store from 'Root/store';
import history from 'Root/history';

export default (current) => {
  store.dispatch({
    type: types.activeMenu.CHANGE,
    current,
  });

  history.push(current);
};
