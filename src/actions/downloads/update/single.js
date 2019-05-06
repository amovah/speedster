import types from 'Root/actions';
import store from 'Root/store';

export default async (id, update) => {
  store.dispatch({
    type: types.downloads.UPDATE,
    id,
    update,
  });
};
