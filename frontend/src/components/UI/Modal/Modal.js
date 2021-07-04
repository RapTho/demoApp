import React from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Modal.module.css";
import * as actions from "../../../store/actions/index";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  return (
    <>
      <Backdrop show={error} click={() => dispatch(actions.authClearError())} />
      <div
        className={classes.Modal}
        style={{
          transform: error ? "translateY(0)" : "translateY(-100vh)",
          opacity: error ? 1 : 0,
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
