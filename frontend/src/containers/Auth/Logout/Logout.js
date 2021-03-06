import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions/index";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => console.log("<Logout /> rendered"));

  useEffect(() => {
    dispatch(actions.authLogout());
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Logout;
