import db from 'Root/db';
import loadConfig from 'Root/actions/config/load';
import loadDownloads from 'Root/actions/downloads/load';

export default () => {
  const config = db.get('config').value();
  loadConfig(config);

  const downloads = db.get('downloads').value();
  loadDownloads(downloads);
};
