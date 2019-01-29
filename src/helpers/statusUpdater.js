import store from 'Root/store';
import fetch from 'Root/helpers/fetch';

export default (downloadId) => {
  const download = store.getState().downloads.find(
    item => item.id === downloadId,
  );

  const job = async () => {
    const rest = await fetch({
      method: 'aria2.tellStatus',
      params: [
        download.gid,
      ],
    });

    console.log(rest);

    setTimeout(job, 350);
  };

  job();
};
