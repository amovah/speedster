import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.queue.LOAD: {
      return action.queue;
    }

    case types.queue.CHANGE: {
      return {
        ...state,
        ...action.toChange,
      };
    }

    default: {
      return state;
    }
  }
};
