import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.tempData.ALTER: {
      return Object.assign({}, state, action.data);
    }

    case types.tempData.CLEAR: {
      return {};
    }

    default: {
      return state;
    }
  }
};
