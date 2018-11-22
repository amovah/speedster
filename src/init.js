import startAria2 from 'Root/helpers/startAria2';
import history from 'Root/history';
import db from 'Root/db';

import loadConfig from 'Root/actions/config/load';

export default async () => {
  await startAria2();

  const config = db.get('config').value();
  loadConfig(config);

  history.push('/');
};
