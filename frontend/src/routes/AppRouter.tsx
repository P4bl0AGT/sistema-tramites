import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { createAnimation } from '@ionic/react';

import PrivateRoute from './PrivateRoute';

import Login from '../pages/auth/Login';
import Registro from '../pages/auth/Registro';
import RF01Ingreso from '../pages/ciudadano/RF01Ingreso';
import RF02Trazabilidad from '../pages/ciudadano/RF02Trazabilidad';
import RF06Subsanacion from '../pages/ciudadano/RF06Subsanacion';
import RF07Notificaciones from '../pages/ciudadano/RF07Notificaciones';
import RF03Bandeja from '../pages/funcionario/RF03Bandeja';
import RF04Alertas from '../pages/funcionario/RF04Alertas';
import RF05Revision from '../pages/funcionario/RF05Revision';

type TransitionOptions = {
  enteringEl: HTMLElement;
  leavingEl?: HTMLElement;
};

const fadeTransition = (_baseEl: HTMLElement, opts: TransitionOptions) => {
  const animations = [
    createAnimation().addElement(opts.enteringEl).fromTo('opacity', '0', '1'),
  ];

  if (opts.leavingEl) {
    animations.push(createAnimation().addElement(opts.leavingEl).fromTo('opacity', '1', '0'));
  }

  return createAnimation()
    .duration(200)
    .easing('ease-in-out')
    .addAnimation(animations);
};

const AppRouter: React.FC = () => (
  <IonRouterOutlet animation={fadeTransition}>
    {/* Rutas públicas */}
    <Route exact path="/login" component={Login} />
    <Route exact path="/registro" component={Registro} />

    {/* Rutas privadas - ciudadano */}
    <PrivateRoute exact path="/ciudadano/ingreso" component={RF01Ingreso} allowedRoles={['ciudadano']} />
    <PrivateRoute exact path="/ciudadano/trazabilidad" component={RF02Trazabilidad} allowedRoles={['ciudadano']} />
    <PrivateRoute exact path="/ciudadano/subsanacion" component={RF06Subsanacion} allowedRoles={['ciudadano']} />
    <PrivateRoute exact path="/ciudadano/notificaciones" component={RF07Notificaciones} allowedRoles={['ciudadano']} />

    {/* Rutas privadas - funcionario */}
    <PrivateRoute exact path="/funcionario/bandeja" component={RF03Bandeja} allowedRoles={['funcionario']} />
    <PrivateRoute exact path="/funcionario/alertas" component={RF04Alertas} allowedRoles={['funcionario']} />
    <PrivateRoute exact path="/funcionario/revision" component={RF05Revision} allowedRoles={['funcionario']} />

    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
  </IonRouterOutlet>
);

export default AppRouter;
