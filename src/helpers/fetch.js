import { generate } from 'shortid';

import db from 'Root/db';

export default async (json) => {
  try {
    const { url } = db.get('setting').value();

    console.log(json, JSON.stringify({
      jsonrpc: '2.0',
      id: generate(),
      ...json,
    }));

    const res = await global.fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: generate(),
        ...json,
      }),
      method: 'POST',
    });

    return {
      res,
      data: await res.json(),
    };
  } catch (e) {
    return 0;
  }
};
