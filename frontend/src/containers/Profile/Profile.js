import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "react-bootstrap/Alert";

import * as actions from "../../store/actions/index";

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

const Profile = () => {
  useEffect(() => {
    console.log("<Profile /> rendered");
  });

  const token = useSelector((state) => state.auth.token);
  const succeeded = useSelector((state) => state.user.succeeded);
  const user = jwtDecode(token);

  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [lat, setLat] = useState(user.location.coordinates[1]);
  const [long, setLong] = useState(user.location.coordinates[0]);
  const [error, setError] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let formData = {
      username: event.target[0].value,
      location: {
        coordinates: [event.target[6].value, event.target[4].value],
        type: "Point",
      },
    };
    dispatch(actions.updateUser(formData, token));
  };

  const onGetLocationHandler = async () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setLat(location.coords.latitude);
        setLong(location.coords.longitude);
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  let successMsg = null;
  if (succeeded) {
    window.scrollTo(0, 0);
    successMsg = (
      <Alert variant="success">The changes were successfully saved</Alert>
    );
    setTimeout(() => dispatch(actions.clearSuccessMessageUser()), 5000);
  }

  let errorMsg = null;
  if (error !== "") {
    window.scrollTo(0, 0);
    errorMsg = <Alert variant="danger">{error}</Alert>;
    setTimeout(() => setError(""), 5000);
  }
  return (
    <>
      {successMsg}
      {errorMsg}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Change personal information
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  label="Username"
                  name="Username"
                  variant="outlined"
                  fullWidth
                  id="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="femail"
                  label="E-mail"
                  name="Email"
                  variant="outlined"
                  fullWidth
                  id="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="flat"
                  label="Latitude"
                  name="Latitude"
                  variant="outlined"
                  fullWidth
                  id="lat"
                  value={lat}
                  onChange={(event) => setLat(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="flong"
                  label="Longitude"
                  name="Longitude"
                  variant="outlined"
                  fullWidth
                  id="long"
                  value={long}
                  onChange={(event) => setLong(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              onClick={onGetLocationHandler}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Get current location
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Profile;
