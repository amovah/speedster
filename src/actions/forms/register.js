import types from 'Root/actions';
import store from 'Root/store';

export default (name) => {
  store.dispatch({
    type: types.forms.REGISTER,
    name,
  });
};
