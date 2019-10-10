import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.setting.LOAD: {
      return action.setting;
    }

    case types.setting.CHANGE: {
      return {
        ...state,
        ...action.setting,
      };
    }

    default: {
      return state;
    }
  }
};
