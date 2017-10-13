import constants from '../constants';

const initialState = {
  all: null
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case constants.POST_CREATED:
      newState[action.data.id] = action.data;
      newState.all.unshift(action.data);
      return newState;

    case constants.FETCH_POSTS:
      action.data.map(post => {
        newState[post.id] = post;
      });

      newState.all = action.data.sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      });

      return newState;

    default:
      return state;
  }
};
