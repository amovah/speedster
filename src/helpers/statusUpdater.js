import store from 'Root/store';
import fetch from 'Root/helpers/fetch';

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

      console.log(res);

      resolve();
    }));

    await Promise.all(actions);

    setTimeout(job, 350);
  };

  job();
};
