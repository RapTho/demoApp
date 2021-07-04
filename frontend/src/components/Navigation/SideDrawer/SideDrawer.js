import React from "react";
import { useSelector } from "react-redux";

import classes from "./SideDrawer.module.css";
// import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidedrawer = (props) => {
  const name = useSelector((state) => state.auth.name);

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <>
      <Backdrop show={props.show} click={props.click} />
      <div className={attachedClasses.join(" ")} onClick={props.click}>
        {/* <div className={classes.Logo}>
                    <Logo />
                </div> */}
        <nav>
          {props.isAuth ? <h4>Hi, {name}</h4> : null}
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </>
  );
};

export default Sidedrawer;
