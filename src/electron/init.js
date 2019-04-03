import { load as loadDB } from 'Root/db';

export default async () => {
  await loadDB();
};
