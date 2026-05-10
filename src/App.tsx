import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Login';
import Registro from './pages/Registro';
import RF01Ingreso from './pages/RF01Ingreso';
import RF03Bandeja from './pages/RF03Bandeja';
import RF02Trazabilidad from './pages/RF02Trazabilidad';
import RF05Revision from './pages/RF05Revision';
import RF04Alertas from './pages/RF04Alertas';
import RF06Subsanacion from './pages/RF06Subsanacion';
import RF07Notificaciones from './pages/RF07Notificaciones';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/ciudadano/ingreso" component={RF01Ingreso} />
        <Route exact path="/ciudadano/trazabilidad" component={RF02Trazabilidad} />
        <Route exact path="/funcionario/bandeja" component={RF03Bandeja} />
        <Route exact path="/funcionario/revision" component={RF05Revision} />
        <Route exact path="/funcionario/alertas" component={RF04Alertas} />
        <Route exact path="/ciudadano/subsanacion" component={RF06Subsanacion} />
        <Route exact path="/ciudadano/notificaciones" component={RF07Notificaciones} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;