import { IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  // Validación: botón habilitado solo si ambos campos tienen texto
  const isFormValid = rut.trim().length > 0 && password.trim().length > 0;

  const handleLogin = () => {
    if (rut === 'admin' && password === 'admin') {
      router.push('/funcionario/bandeja', 'forward', 'push');
    } else {
      router.push('/ciudadano/ingreso', 'forward', 'push');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ '--background': 'var(--muni-sand)' }}>
        <div style={{ marginTop: '20%', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--gob-primary)', fontWeight: 'bold', marginBottom: '40px' }}>
            Municipalidad de Santo Domingo
          </h2>
          
          {/* Ajuste de espacio con className="ion-margin-top" */}
          <IonItem lines="full" className="ion-margin-top">
            <IonLabel position="floating">RUT o Usuario</IonLabel>
            <IonInput 
              value={rut} 
              onIonInput={(e) => setRut(e.detail.value!)} 
              placeholder="admin / 12.345.678-k"
            />
          </IonItem>

          <IonItem lines="full" style={{ marginTop: '20px' }}>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput 
              type="password" 
              value={password} 
              onIonInput={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>

          <IonButton 
            expand="block" 
            className="ion-margin-top" 
            onClick={handleLogin} 
            disabled={!isFormValid}
            style={{ '--background': 'var(--gob-primary)', marginTop: '40px' }}
          >
            Iniciar Sesión
          </IonButton>

          <div style={{ marginTop: '20px' }}>
            <IonButton fill="clear" routerLink="/registro" style={{ '--color': 'var(--gob-gray-a)' }}>
              ¿No tienes cuenta? Regístrate aquí
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;