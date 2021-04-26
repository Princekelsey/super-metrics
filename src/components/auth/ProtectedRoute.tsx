import React from "react";
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  sl_token: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  sl_token,
  path,
  exact,
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        sl_token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
