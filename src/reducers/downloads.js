import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.downloads.LOAD: {
      return action.downloads;
    }

    case types.downloads.ADD: {
      return [
        ...state,
        action.download,
      ];
    }

    case types.downloads.UPDATE: {
      const index = state.findIndex(item => item.id === action.id);
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          ...action.update,
        },
        ...state.slice(index + 1),
      ];
    }

    case types.downloads.PAUSE: {
      const index = state.findIndex(item => item.id === action.id);
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          downloadStatus: 'pause',
        },
        ...state.slice(index + 1),
      ];
    }

    case types.downloads.RESUME: {
      const index = state.findIndex(item => item.id === action.id);
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          downloadStatus: 'downloading',
        },
        ...state.slice(index + 1),
      ];
    }

    case types.downloads.REMOVE: {
      const index = state.findIndex(item => item.id === action.id);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }

    case types.downloads.COMPLETE: {
      const index = state.findIndex(item => item.id === action.id);
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          downloadStatus: 'completed',
        },
        ...state.slice(index + 1),
      ];
    }

    case types.downloads.SUSPEND: {
      const index = state.findIndex(item => item.id === action.id);
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          downloadStatus: 'suspend',
        },
        ...state.slice(index + 1),
      ];
    }

    default: {
      return state;
    }
  }
};
