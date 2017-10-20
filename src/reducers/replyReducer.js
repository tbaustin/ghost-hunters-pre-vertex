import constants from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case constants.REPLY_CREATED:
      newState[action.data.postId].unshift(action.data);

      return newState;

    case constants.GET_REPLIES:
      newState[action.params.postId] = action.data;

      return newState;

    default:
      return newState;
  }
};
