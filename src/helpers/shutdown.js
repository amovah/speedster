import { remote } from 'electron';
import fetch from 'Root/helpers/fetch';

export default async () => {
  await fetch({
    method: 'aria2.shutdown',
  });

  remote.app.quit();
};
