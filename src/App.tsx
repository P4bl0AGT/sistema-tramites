import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Login';
import Registro from './pages/Registro';
import RF01Ingreso from './pages/RF01Ingreso';
import RF03Bandeja from './pages/RF03Bandeja';
import RF02Trazabilidad from './pages/RF02Trazabilidad';

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
        {/* Aquí conectaremos las páginas en el paso 1.6 */}
        <Route exact path="/login">
          {<Login />}
        </Route>

        <Route exact path="/registro">
          <Registro />
        </Route>

        <Route exact path="/ciudadano/ingreso">
          <RF01Ingreso />
        </Route>

        <Route exact path="/funcionario/bandeja">
          <RF03Bandeja />
        </Route>

        <Route exact path="/ciudadano/trazabilidad">
          <RF02Trazabilidad />
        </Route>
        
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;