import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonItem, IonLabel, IonSelect, IonSelectOption, 
  IonTextarea, IonButton, IonIcon, IonFooter, 
  IonTabBar, IonTabButton, IonButtons, IonMenuButton
} from '@ionic/react';
import { addCircleOutline, listOutline, chatbubbleEllipsesOutline, briefcaseOutline } from 'ionicons/icons';
import React from 'react';

const RF01Ingreso: React.FC = () => {
  return (
    <IonPage>
      {/* Cabecera superior estilo Gob.cl */}
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--gob-primary)', '--color': 'white' }}>
          <IonTitle>Ingreso de Trámite</IonTitle>
          <IonButtons slot="end">
            <IonButton>Cerrar Sesión</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': 'var(--muni-sand)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--gob-primary)', fontWeight: 'bold' }}>Nuevo Expediente Electrónico</h2>
          <p style={{ color: 'var(--gob-gray-a)' }}>Complete los datos para iniciar su solicitud en la Municipalidad.</p>

          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <IonItem lines="none" style={{ marginBottom: '15px' }}>
              <IonLabel position="stacked" style={{ color: 'var(--gob-tertiary)', fontWeight: '500' }}>Tipo de Trámite</IonLabel>
              <IonSelect placeholder="Seleccione una opción" interface="action-sheet" style={{ width: '100%', borderBottom: '1px solid #ccc' }}>
                <IonSelectOption value="reclamo">Reclamo Municipal</IonSelectOption>
                <IonSelectOption value="patente">Patente Comercial</IonSelectOption>
                <IonSelectOption value="subsidio">Subsidio Social</IonSelectOption>
                <IonSelectOption value="otros">Otros Trámites</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem lines="none" style={{ marginBottom: '15px' }}>
              <IonLabel position="stacked" style={{ color: 'var(--gob-tertiary)', fontWeight: '500' }}>Descripción del Caso</IonLabel>
              <IonTextarea 
                placeholder="Detalle brevemente su solicitud..." 
                rows={4} 
                style={{ border: '1px solid #eee', borderRadius: '5px', marginTop: '10px' }}
              />
            </IonItem>

            <div style={{ padding: '0 16px', marginBottom: '20px' }}>
              <p style={{ fontWeight: '500', fontSize: '14px' }}>Adjuntar Documentación (PDF/JPG)</p>
              <input type="file" style={{ width: '100%', padding: '10px', background: 'var(--gob-neutral)', borderRadius: '4px' }} />
            </div>

            <IonButton expand="block" style={{ '--background': 'var(--gob-green)', fontWeight: 'bold' }}>
              Enviar Solicitud
            </IonButton>
          </div>
        </div>
      </IonContent>

      {/* Barra de navegación inferior (Mobile Tabbar) según tu diseño */}
      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ '--border': 'none', borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="tramite" selected style={{ '--color-selected': 'var(--gob-primary)' }}>
            <IonIcon icon={addCircleOutline} />
            <IonLabel>Trámite</IonLabel>
          </IonTabButton>
          <IonTabButton tab="estado" routerLink="/ciudadano/trazabilidad">
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