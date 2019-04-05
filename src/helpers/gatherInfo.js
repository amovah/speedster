import fetch from './fetch';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export default async (url) => {
  const gid = await fetch({
    method: 'aria2.addUri',
    params: [
      [
        url,
      ],
      {
        'dry-run': 'true',
      },
    ],
  });

  if (!gid) {
    return 'error';
  }

  let count = 15;

  while (count > 0) {
    const res = await fetch({
      method: 'aria2.tellStatus',
      params: [
        gid.result,
      ],
    });

    if (res && parseInt(res.result.completedLength, 10) > 0) {
      return res.result;
    }

    await sleep(500);
    count = count - 1;
  }

  return 'cant';
};
