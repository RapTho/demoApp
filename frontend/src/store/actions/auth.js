import axios from "axios";
import jwtDecode from "jwt-decode";

import * as actionTypes from "./actionTypes";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const getUserData = (token) => {
  let userId = jwtDecode(token).userId;
  let username = jwtDecode(token).username;
  let location = jwtDecode(token).pin.location;

  return {
    userId,
    username,
    location,
  };
};

const authStarted = () => {
  return {
    type: actionTypes.AUTH_STARTED,
  };
};

const authSucceeded = (token, userId, username, location) => {
  return {
    type: actionTypes.AUTH_SUCCEEDED,
    token,
    userId,
    username,
    location,
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkTokenExpiration = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime);
  };
};

export const auth = (formData, method, staySignedIn) => {
  return (dispatch) => {
    dispatch(authStarted());

    let authData = {
      email: formData.email,
      password: formData.password,
    };
    let url = BACKEND_URL + "/api/auth/login";
    if (method === "signup") {
      url = BACKEND_URL + "/api/user/createUser";
      authData.username = formData.username;
      authData.location = formData.location;
    }

    axios
      .post(url, authData)
      .then((response) => {
        let expirationDate = null;
        if (method === "signin") {
          if (response.data.success === false) {
            dispatch(authFailed(response.data.message));
            return;
          }
          expirationDate = new Date(response.data.aT_expiration * 1000);
        }

        if (staySignedIn) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("expiration", expirationDate);
        }
        let userData = getUserData(response.data.token);
        dispatch(
          authSucceeded(
            response.data.token,
            userData.userId,
            userData.username,
            userData.location
          )
        );
      })
      .catch((error) => {
        dispatch(authFailed(error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expiration"));
      if (!expirationDate || expirationDate < new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(
          checkTokenExpiration(expirationDate.getTime() - new Date().getTime())
        );
        let userData = getUserData(token);
        dispatch(
          authSucceeded(
            token,
            userData.userId,
            userData.username,
            userData.location
          )
        );
      }
    }
  };
};

export const authClearError = () => {
  return {
    type: actionTypes.AUTH_CLEAR_ERROR,
  };
};
