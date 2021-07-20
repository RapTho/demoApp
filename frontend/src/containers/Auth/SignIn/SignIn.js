import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import classes from "./SignIn.module.css";

import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Modal from "../../../components/UI/Modal/ModalSignIn";

const SignIn = () => {
  useEffect(() => console.log("<Signin /> rendered"));

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isAuth = useSelector((state) => state.auth.token !== null);
  // const redirectRoute = useSelector((state) => state.navigation.route);
  let authRedirect = null;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let formData = {
      email: event.target[0].value,
      password: event.target[1].value,
    };
    dispatch(actions.auth(formData, event.target[2].checked));
  };

  let content = (
    <Container className={classes.loginContainer}>
      <Form onSubmit={onSubmitHandler}>
        <Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail address</Form.Label>
            <Form.Control type="email" placeholder="Enter e-mail" />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Col>
        </Row>
        <Row>
          <NavLink to="/signup" className={classes.registerButton}>
            Register a new acocunt
          </NavLink>
        </Row>
      </Form>
    </Container>
  );
  if (loading) content = <Spinner />;

  // if (isAuth) {
  //   authRedirect = (
  //     <Redirect to={redirectRoute === "/createAd" ? redirectRoute : "/"} />
  //   );
  // }

  let errorMsg = null;
  if (error) errorMsg = <Modal>{error.message}</Modal>;

  return (
    <>
      {authRedirect}
      {errorMsg}
      {content}
    </>
  );
};

export default SignIn;
