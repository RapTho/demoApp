import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../libs/updateObject";

const initialState = {
  succeeded: null,
  error: null,
  loading: false,
};

const userStarted = (state) => {
  return updateObject(state, { loading: true, succeeded: false });
};

const userSucceeded = (state) => {
  return updateObject(state, {
    error: null,
    loading: false,
    succeeded: true,
  });
};

const userFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    succeeded: false,
  });
};

const clearSuccessMessageUser = (state) => {
  return updateObject(state, {
    succeeded: null,
  });
};

const userClearError = (state) => {
  return updateObject(state, {
    error: null,
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_STARTED:
      return userStarted(state);
    case actionTypes.USER_SUCCEEDED:
      return userSucceeded(state);
    case actionTypes.USER_FAILED:
      return userFailed(state, action);
    case actionTypes.CLEAR_SUCCESS_MESSAGE_USER:
      return clearSuccessMessageUser(state);
    case actionTypes.USER_CLEAR_ERROR:
      return userClearError(state);
    default:
      return state;
  }
};

export default userReducer;
