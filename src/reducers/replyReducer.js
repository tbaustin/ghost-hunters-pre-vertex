import constants from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case constants.REPLY_CREATED:
      newState[action.data.postId] = action.data;

      return newState;

    case constants.GET_REPLIES:
      console.log(action.data);
      action.data.map(reply => {
        newState[reply.postId] = reply;
      });

      return newState;

    default:
      return newState;
  }
};
