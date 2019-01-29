import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.setting.LOAD: {
      return action.config;
    }

    default: {
      return state;
    }
  }
};
