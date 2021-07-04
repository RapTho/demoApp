import React, { useState } from "react";
import { useSelector } from "react-redux";

import NavBar from "../../components/Navigation/NavBar/NavBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const isAuth = useSelector((state) => state.auth.token !== null);

  const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false);

  const hideSideDrawerHandler = () => {
    setIsSideDrawerVisible(false);
  };

  const showSideDrawerHandler = () => {
    setIsSideDrawerVisible(!isSideDrawerVisible);
  };

  return (
    <>
      <NavBar showSideDrawer={showSideDrawerHandler} isAuth={isAuth} />
      <SideDrawer
        show={isSideDrawerVisible}
        click={hideSideDrawerHandler}
        isAuth={isAuth}
      />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
