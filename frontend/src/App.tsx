import React from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import AppRouter from './routes/AppRouter';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';
import './theme/municipal.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppRouter />
    </IonReactRouter>
  </IonApp>
);

export default App;