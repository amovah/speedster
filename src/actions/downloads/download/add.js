import types from 'Root/actions';
import store from 'Root/store';

export default async (download) => {
  store.dispatch({
    type: types.downloads.ADD,
    download,
  });
};
