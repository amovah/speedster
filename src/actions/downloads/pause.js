import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';

export default async (id) => {
  const download = store.getState().downloads.find(i => i.id === id);

  const res = await fetch({
    method: 'aria2.pause',
    params: [
      download.gid,
    ],
  });

  console.log(res);

  store.dispatch({
    type: types.downloads.PAUSE,
    id,
  });
};
