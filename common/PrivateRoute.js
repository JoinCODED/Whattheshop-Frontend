import React from "react";
import { observer } from "mobx-react";

// Router
import { Route, Redirect } from "react-router-native";

// Store
import authStore from "../stores/authStore";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authStore.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default observer(PrivateRoute);
