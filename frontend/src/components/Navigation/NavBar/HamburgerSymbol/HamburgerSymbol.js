import React from "react";

import classes from "./HamburgerSymbol.module.css";

const HamburgerSymbol = (props) => {
  return (
    <div className={classes.Hamburger} onClick={() => props.click()}>
      <div className={classes.Bar}></div>
      <div className={classes.Bar}></div>
      <div className={classes.Bar}></div>
    </div>
  );
};

export default HamburgerSymbol;
