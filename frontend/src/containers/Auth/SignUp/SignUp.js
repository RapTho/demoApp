import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Modal from "../../../components/UI/Modal/ModalSignUp";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  useEffect(() => console.log("<Signup /> rendered"));
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const succeeded = useSelector((state) => state.user.succeeded);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let formData = {
      username: event.target[0].value,
      email: event.target[2].value,
      password: event.target[4].value,
    };
    dispatch(actions.createUser(formData));
  };

  let content = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/signin" exact>
                I already have an account
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  if (loading) content = <Spinner />;

  let authRedirect = null;
  if (succeeded) {
    authRedirect = <Redirect to="/" />;
    setTimeout(() => {
      dispatch(actions.clearSuccessMessageUser());
    }, 1000);
  }

  let errorMsg = null;
  if (error)
    errorMsg = (
      <Modal>
        {error.message.includes("code 409")
          ? "Username or e-mail address already exists"
          : error.message}
      </Modal>
    );

  return (
    <>
      {authRedirect}
      {errorMsg}
      {content}
    </>
  );
};

export default SignUp;
