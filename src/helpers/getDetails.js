import fetch from './fetch';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export default async (gid) => {
  let count = 15;

  while (count > 0) {
    const res = await fetch({
      method: 'aria2.tellStatus',
      params: [
        gid,
      ],
    });

    if (parseInt(res.data.result.completedLength, 10) > 0) {
      return res.data.result;
    }

    await sleep(500);
    count = count - 1;
  }

  return null;
};
