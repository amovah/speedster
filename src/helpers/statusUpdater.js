import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import update from 'Root/actions/downloads/update';
import complete from 'Root/actions/downloads/complete';

export default () => {
  const job = async () => {
    const downloads = store.getState().downloads.filter(
      item => item.downloadStatus === 'downloading',
    );

    const actions = downloads.map(download => new Promise(async (resolve) => {
      const res = await fetch({
        method: 'aria2.tellStatus',
        params: [
          download.gid,
        ],
      });

      update(download.id, res.data.result);
      if (res.data.result.totalLength === res.data.result.completedLength) {
        complete(download.id);
      }

      resolve();
    }));

    await Promise.all(actions);

    setTimeout(job, 350);
  };

  job();
};
