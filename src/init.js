import startAria2 from 'Root/helpers/startAria2';
import history from 'Root/history';
import db from 'Root/db';
import store from 'Root/store';
import types from 'Root/actions';

export default async () => {
  await startAria2();

  const config = db.get('config').value();
  store.dispatch({
    type: types.LOAD,
    config,
  });

  history.push('/');
};
