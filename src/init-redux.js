import db from 'Root/db';
import loadConfig from 'Root/actions/config/load';

export default () => {
  const config = db.get('config').value();
  loadConfig(config);
};
