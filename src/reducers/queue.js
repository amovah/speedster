import types from 'Root/actions';

export default (state = {
  list: [],
}, action) => {
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

    case types.queue.ADD: {
      return {
        ...state,
        list: [
          ...state.list,
          action.id,
        ],
      };
    }

    case types.queue.REMOVE: {
      const index = state.list.findIndex(i => i === action.id);

      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          ...state.list.slice(index + 1),
        ],
      };
    }

    default: {
      return state;
    }
  }
};
