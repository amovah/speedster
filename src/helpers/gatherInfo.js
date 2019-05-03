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
    return null;
  }

  let count = 10;

  while (count > 0) {
    const res = await fetch({
      method: 'aria2.tellStatus',
      params: [
        gid.result,
      ],
    });

    if (res.result.errorCode === '3') {
      return null;
    }

    if (res && parseInt(res.result.completedLength, 10) > 0) {
      return res.result;
    }

    await sleep(500);
    count = count - 1;
  }

  return null;
};
