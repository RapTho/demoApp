import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

import classes from "./DropdownUser.module.css";

const DropdownUser = (props) => {
  return (
    <div className={classes.Dropdown}>
      <button className={classes.DropdownButton}>
        Hi, {props.name} <FontAwesomeIcon icon={faSortDown} color="white" />
      </button>
      <div className={classes.DropdownContent}>
        <NavLink to="/myAds">My Things</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/logout">Logout</NavLink>
      </div>
    </div>
  );
};

export default DropdownUser;
