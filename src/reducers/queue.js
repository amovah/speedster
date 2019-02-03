import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.queue.LOAD: {
      return action.queue;
    }

    default: {
      return state;
    }
  }
};
