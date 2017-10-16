import constants from '../constants';
import { TurboClient } from '../utils';

export default {
  fetchUsers: params => {
    return dispatch => {
      return dispatch(TurboClient.getRequest('user', params, constants.USERS_RECEIVED));
    };
  },

  addUser: params => {
    return dispatch => {
      return dispatch(TurboClient.postRequest('user', params, constants.USER_CREATED));
    };
  },

  // Unlike addUser, register() also maintains a session for login state. After calling
  // TurboClient.createUser(), the new user is logged in as well:
  register: params => {
    return dispatch => {
      return dispatch(TurboClient.createUser(params, constants.USER_CREATED));
    };
  },

  loginUser: credentials => {
    return dispatch => {
      return dispatch(TurboClient.login(credentials, constants.CURRENT_USER_RECEIVED));
    };
  },

  logoutUser: () => {
    return dispatch => {
      return dispatch(TurboClient.logout(constants.USER_LOGGED_OUT));
    };
  },

  currentUser: () => {
    return dispatch => {
      return dispatch(TurboClient.currentUser(constants.CURRENT_USER_RECEIVED));
    };
  },

  createPost: params => {
    return dispatch => {
      return dispatch(TurboClient.createPost(params, constants.POST_CREATED));
    };
  },

  fetchPosts: params => {
    return dispatch => {
      return dispatch(TurboClient.fetchPosts(params, constants.FETCH_POSTS));
    };
  }
};
