import update from './update';

export default async (id) => {
  update(id, {
    downloadStatus: 'failed',
  });
};
