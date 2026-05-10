import { 
  IonContent, IonPage, IonButton, IonInput, 
  IonItem, IonLabel, IonHeader, IonToolbar, 
  IonTitle, IonBackButton, IonButtons 
} from '@ionic/react';
import React from 'react';

const Registro: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--gob-primary)', '--color': 'white' }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': 'var(--muni-sand)' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--gob-tertiary)', fontWeight: 'bold' }}>Registro de Ciudadano</h3>
        </div>

        <IonItem lines="full">
          <IonLabel position="floating">Nombre Completo</IonLabel>
          <IonInput type="text"></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">RUT</IonLabel>
          <IonInput placeholder="12.345.678-9"></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Correo Electrónico</IonLabel>
          <IonInput type="email"></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password"></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Confirmar Contraseña</IonLabel>
          <IonInput type="password"></IonInput>
        </IonItem>

        <div className="ion-padding-top">
          <IonButton expand="block" style={{ '--background': 'var(--gob-primary)' }}>
            Registrarse
          </IonButton>
          <IonButton expand="block" fill="clear" routerLink="/login" style={{ '--color': 'var(--gob-gray-a)' }}>
            Ya tengo cuenta, volver al login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Registro;