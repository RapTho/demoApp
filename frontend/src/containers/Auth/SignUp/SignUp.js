import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import classes from "./SignUp.module.css";

import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Modal from "../../../components/UI/Modal/ModalSignIn";

const SignIn = () => {
  useEffect(() => console.log("<Signin /> rendered"));

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const succeeded = useSelector((state) => state.user.succeeded);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let formData = {
      username: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
    };
    dispatch(actions.createUser(formData));

    // To allow going back to /signup. Otherwise autoRedirect kicks in
    setTimeout(dispatch, 2000, actions.clearSuccessMessageUser());
  };

  let content = (
    <Container className={classes.loginContainer}>
      <Form onSubmit={onSubmitHandler}>
        <Row>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
        </Row>
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
          <Col>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Col>
        </Row>
        <Row>
          <NavLink to="/signin" className={classes.registerButton}>
            I already have an account
          </NavLink>
        </Row>
      </Form>
    </Container>
  );
  if (loading) content = <Spinner />;

  let autoRedirect = null;
  if (succeeded) {
    autoRedirect = <Redirect to="/signin" />;
  }

  let errorMsg = null;
  if (error) errorMsg = <Modal>{error.message}</Modal>;

  return (
    <>
      {autoRedirect}
      {errorMsg}
      {content}
    </>
  );
};

export default SignIn;
