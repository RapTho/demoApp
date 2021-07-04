import axios from "axios";

import * as actionTypes from "./actionTypes";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const userStarted = () => {
  return {
    type: actionTypes.USER_STARTED,
  };
};

const userSucceeded = () => {
  return {
    type: actionTypes.USER_SUCCEEDED,
  };
};

const userFailed = (error) => {
  return {
    type: actionTypes.USER_FAILED,
    error,
  };
};

export const createUser = (formData) => {
  return (dispatch) => {
    dispatch(userStarted());

    let url = BACKEND_URL + "/api/user/createUser";

    axios
      .post(url, formData)
      .then((response) => {
        if (response.status === 201) {
          dispatch(userSucceeded());
        }
      })
      .catch((error) => {
        dispatch(userFailed(error));
      });
  };
};

export const updateUser = (formData) => {
  return (dispatch) => {
    dispatch(userStarted());

    let url = BACKEND_URL + "/api/user/updateUser";

    axios
      .post(url, formData)
      .then((response) => {
        if (response.status === 200) {
          dispatch(userSucceeded());
        }
      })
      .catch((error) => {
        dispatch(userFailed(error));
      });
  };
};

export const clearSuccessMessageUser = () => {
  return {
    type: actionTypes.CLEAR_SUCCESS_MESSAGE_USER,
  };
};

export const userClearError = () => {
  return {
    type: actionTypes.USER_CLEAR_ERROR,
  };
};
