import React, { useEffect, Suspense } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./hoc/Layout/Layout";
import Spinner from "./components/UI/Spinner/Spinner";
import Logout from "./containers/Auth/Logout/Logout";
import SignIn from "./containers/Auth/SignIn/SignIn";
import * as actions from "./store/actions/index";

// Lazy loading components when needed
const SignUp = React.lazy(() => {
  return import("./containers/Auth/SignUp/SignUp");
});
const Profile = React.lazy(() => {
  return import("./containers/Profile/Profile");
});
// const MyThings = React.lazy(() => {
//   return import("./containers/MyThings/MyThings");
// });

const App = (props) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.token !== null);

  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  useEffect(() => console.log("<App /> rendered"));

  let routes = (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" render={(props) => <SignUp {...props} />} />
      <Route path="/logout" component={Logout} />
      {/* <Route path="/" exact component={Home} /> */}
      <Redirect to="/" />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route path="/profile" render={(props) => <Profile {...props} />} />
        {/* <Route path="/myThings" render={(props) => <MyThings {...props} />} /> */}
        <Route path="/logout" component={Logout} />
        {/* <Route path="/" exact component={Home} /> */}
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
