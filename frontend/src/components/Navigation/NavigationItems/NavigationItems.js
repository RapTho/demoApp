import React from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  const mediaMax600px = useMediaQuery("(max-width:600px)");

  const smartphoneOnlyLinks = mediaMax600px ? (
    <>
      <NavigationItem link="/myAds">My Things</NavigationItem>
      <NavigationItem link="/profile">Profile</NavigationItem>
      <NavigationItem link="/logout">Logout</NavigationItem>
    </>
  ) : null;
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
      {!props.isAuthenticated ? (
        <NavigationItem link="/signin">Sign in</NavigationItem>
      ) : (
        smartphoneOnlyLinks
      )}
    </ul>
  );
};

export default NavigationItems;
