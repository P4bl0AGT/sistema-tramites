import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonItem, IonLabel, IonSelect, IonSelectOption, 
  IonTextarea, IonButton, IonIcon, IonFooter, 
  IonTabBar, IonTabButton, IonButtons, useIonRouter
} from '@ionic/react';
import { addCircleOutline, listOutline, chatbubbleEllipsesOutline, logOutOutline } from 'ionicons/icons';
import React, { useState } from 'react';

const RF01Ingreso: React.FC = () => {
  const router = useIonRouter();
  
  const [tramiteData, setTramiteData] = useState({
    tipo: '',
    descripcion: '',
    archivo: null as File | null
  });

  // Ajuste de validación: >= 10 caracteres y verificación de archivo
  const isFormValid = 
    tramiteData.tipo !== '' && 
    tramiteData.descripcion.trim().length >= 10 && 
    tramiteData.archivo !== null;

  const handleSend = () => {
    // Usamos 'forward' para simular que avanzamos en el proceso
    router.push('/ciudadano/trazabilidad', 'forward', 'push');
  };

const handleLogout = () => {
    // Esto fuerza al navegador a cargar la ruta desde cero, 
    // limpiando cualquier error de navegación del router.
    window.location.href = '/login';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--gob-primary)', '--color': 'white' }}>
          <IonTitle>Ingreso de Trámite</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': 'var(--muni-sand)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--gob-primary)', fontWeight: 'bold', marginBottom: '20px' }}>
            Nuevo Expediente Electrónico
          </h2>
          
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            
            <IonItem lines="full" className="ion-margin-bottom">
              <IonLabel position="floating" style={{ fontWeight: '500' }}>Tipo de Trámite</IonLabel>
              <IonSelect 
                placeholder="Seleccione una opción" 
                value={tramiteData.tipo}
                onIonChange={(e) => setTramiteData({...tramiteData, tipo: e.detail.value})}
              >
                <IonSelectOption value="reclamo">Reclamo Municipal</IonSelectOption>
                <IonSelectOption value="patente">Patente Comercial</IonSelectOption>
                <IonSelectOption value="subsidio">Subsidio Social</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem lines="full" className="ion-margin-bottom" style={{ marginTop: '20px' }}>
              <IonLabel position="floating" style={{ fontWeight: '500' }}>Descripción del Caso</IonLabel>
              <IonTextarea 
                placeholder="Explique su solicitud (mín. 10 caracteres)..." 
                rows={4}
                value={tramiteData.descripcion}
                onIonInput={(e) => setTramiteData({...tramiteData, descripcion: e.detail.value!})}
              />
            </IonItem>

            <div style={{ padding: '16px 0' }}>
              <p style={{ fontWeight: '500', fontSize: '14px', marginBottom: '10px' }}>Adjuntar Documento</p>
              <input 
                type="file" 
                onChange={(e) => setTramiteData({...tramiteData, archivo: e.target.files ? e.target.files[0] : null})}
                style={{ width: '100%', padding: '10px', background: 'var(--gob-neutral)', borderRadius: '6px' }} 
              />
            </div>

            <IonButton 
              expand="block" 
              onClick={handleSend}
              disabled={!isFormValid}
              style={{ '--background': 'var(--gob-green)', marginTop: '30px' }}
            >
              Enviar Solicitud
            </IonButton>
          </div>
        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom">
          <IonTabButton tab="tramite" selected>
            <IonIcon icon={addCircleOutline} />
            <IonLabel>Trámite</IonLabel>
          </IonTabButton>
          <IonTabButton tab="estado" onClick={() => router.push('/ciudadano/trazabilidad', 'forward')}>
            <IonIcon icon={listOutline} />
            <IonLabel>Estado</IonLabel>
          </IonTabButton>
          <IonTabButton tab="avisos">
            <IonIcon icon={chatbubbleEllipsesOutline} />
            <IonLabel>Avisos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF01Ingreso;