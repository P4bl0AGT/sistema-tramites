import { IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import React from 'react';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ '--background': 'var(--muni-sand)' }}>
        <div className="login-container" style={{ marginTop: '20%' }}>
          <div className="text-center">
            <h2 style={{ color: 'var(--gob-primary)', fontWeight: 'bold' }}>Municipalidad de Santo Domingo</h2>
            <p>Acceso al Sistema de Trámites</p>
          </div>

          <IonItem lines="full" style={{ marginTop: '20px' }}>
            <IonLabel position="floating">RUT</IonLabel>
            <IonInput placeholder="12.345.678-9"></IonInput>
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password"></IonInput>
          </IonItem>

          <IonButton expand="block" style={{ '--background': 'var(--gob-primary)', marginTop: '30px' }}>
            Iniciar Sesión
          </IonButton>

          <div className="text-center" style={{ marginTop: '20px' }}>
            <a href="/registro" style={{ color: 'var(--gob-gray-a)' }}>¿No tienes cuenta? Regístrate aquí</a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;