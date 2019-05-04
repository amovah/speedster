import resume from 'Root/actions/queue/resume';
import update from './update';

export default (id) => {
  update(id, {
    queue: true,
  });

  resume();
};
