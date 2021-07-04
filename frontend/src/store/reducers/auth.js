import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../libs/updateObject";

const initialState = {
  token: null,
  userId: null,
  username: null,
  location: null,
  error: null,
  loading: false,
};

const authStarted = (state) => {
  return updateObject(state, { loading: true });
};

const authSucceeded = (state, action) => {
  return updateObject(state, {
    token: action.accessToken,
    userId: action.userId,
    username: action.username,
    location: action.location,
    error: null,
    loading: false,
  });
};

const authFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userId: null,
    USERname: null,
    location: null,
    error: null,
    loading: false,
  });
};

const authClearError = (state) => {
  return updateObject(state, {
    error: null,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_STARTED:
      return authStarted(state);
    case actionTypes.AUTH_SUCCEEDED:
      return authSucceeded(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.AUTH_CLEAR_ERROR:
      return authClearError(state);
    default:
      return state;
  }
};

export default authReducer;
