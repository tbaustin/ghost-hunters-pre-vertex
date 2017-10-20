import constants from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case constants.GET_PROFILE:
      newState[action.data.id] = action.data;
      return newState;

    default:
      return newState;
  }
};
