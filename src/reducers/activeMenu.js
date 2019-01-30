import types from 'Root/actions';

export default (state = 'all', action) => {
  switch (action.type) {
    case types.activeMenu.CHANGE: {
      return action.current;
    }

    default: {
      return state;
    }
  }
};
