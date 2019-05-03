import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.forms.REGISTER: {
      return [
        ...state,
        {
          name: action.name,
          inputs: [],
        },
      ];
    }

    default: {
      return state;
    }
  }
};
