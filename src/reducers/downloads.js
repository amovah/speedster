import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.downloads.LOAD: {
      return action.downloads;
    }

    default: {
      return state;
    }
  }
};
