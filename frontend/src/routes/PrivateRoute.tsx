import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { RouteComponentProps, RouteProps } from 'react-router-dom';
import { authService } from '../services/auth.service';

type PrivateRouteProps = RouteProps & {
  component: React.ComponentType<RouteComponentProps>;
  allowedRoles?: Array<'ciudadano' | 'funcionario'>;
};

const defaultPathByRole = {
  ciudadano: '/ciudadano/ingreso',
  funcionario: '/funcionario/bandeja',
} as const;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, allowedRoles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!authService.isAuthenticated()) return <Redirect to="/login" />;

      const role = authService.getRole();
      if (allowedRoles && (!role || !allowedRoles.includes(role))) {
        return <Redirect to={role ? defaultPathByRole[role] : '/login'} />;
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
