import update from '../update';

export default async (id) => {
  update(id, {
    queue: false,
  });
};
