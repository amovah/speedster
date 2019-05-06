import types from 'Root/actions';
import store from 'Root/store';

export default async (ids, update) => {
  store.dispatch({
    type: types.downloads.BULK_UPDATE,
    ids,
    update,
  });
};
