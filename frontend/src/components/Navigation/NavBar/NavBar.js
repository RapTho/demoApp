import React from "react";
import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "./NavBar.module.css";
// import Logo from "../../Logo/Logo";
import HamburgerSymbol from "./HamburgerSymbol/HamburgerSymbol";
import NavicationItems from "../NavigationItems/NavigationItems";
import DropdownUser from "./DropdownUser/DropdownUser";

const NavBar = (props) => {
  const username = useSelector((state) => state.auth.username);

  return (
    <header className={classes.NavBar}>
      <Container fluid style={{ height: "100%" }}>
        <Row className="align-items-center" style={{ height: "100%" }}>
          <Col>
            <div className={classes.Logo}>
              <h5>demoApp</h5>
            </div>
            <HamburgerSymbol click={props.showSideDrawer} />
          </Col>
          <Col
            className={["d-flex justify-content-end", classes.DesktopOnly].join(
              " "
            )}
          >
            <NavicationItems isAuthenticated={props.isAuth} />
            {props.isAuth ? <DropdownUser username={username} /> : null}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default NavBar;
