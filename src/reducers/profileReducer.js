import constants from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_PROFILE:
      return { ...state, [action.data.id]: action.data };

    case constants.UPDATE_PROFILE:
      return { ...state, [action.data.id]: action.data };

    default:
      return state;
  }
};
