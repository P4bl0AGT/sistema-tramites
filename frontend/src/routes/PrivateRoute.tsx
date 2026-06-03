import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { RouteComponentProps, RouteProps } from 'react-router-dom';
import { authService } from '../services/auth.service';

type PrivateRouteProps = RouteProps & {
  component: React.ComponentType<RouteComponentProps>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authService.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
