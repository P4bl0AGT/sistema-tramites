import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton, 
  IonButtons, IonLabel, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonItem, IonBadge
} from '@ionic/react';
import { 
  addCircleOutline, listOutline, chatbubbleEllipsesOutline, 
  checkmarkCircle, timeOutline, alertCircleOutline, logOutOutline 
} from 'ionicons/icons';
import React from 'react';

const handleLogout = () => {
  window.location.href = '/login';
};

const RF02Trazabilidad: React.FC = () => {
  // Datos simulados para la línea de tiempo del trámite
  const historial = [
    { fecha: '10 May 2026', estado: 'Ingresado', icon: checkmarkCircle, color: 'success', desc: 'Trámite recibido por la oficina de partes.' },
    { fecha: '12 May 2026', estado: 'En Revisión', icon: timeOutline, color: 'primary', desc: 'Asignado al departamento correspondiente.' },
    { fecha: '15 May 2026', estado: 'Observado', icon: alertCircleOutline, color: 'warning', desc: 'Falta adjuntar copia del carnet de identidad.' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--gob-primary)', '--color': 'white' }}>
          <IonTitle>Estado de Trámites</IonTitle>
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
          <h2 style={{ color: 'var(--gob-primary)', fontWeight: 'bold' }}>Seguimiento en Línea</h2>
          <p style={{ color: 'var(--gob-gray-a)' }}>Revise el progreso de sus solicitudes.</p>

          <IonCard style={{ margin: '0', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <IonCardHeader style={{ background: 'var(--gob-neutral)', borderBottom: '1px solid #ddd' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IonCardTitle style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--gob-tertiary)' }}>
                  Ticket: T-2026-042
                </IonCardTitle>
                <IonBadge color="warning">Observado</IonBadge>
              </div>
              <p style={{ margin: '5px 0 0 0', color: 'var(--gob-gray-a)' }}>Patente Comercial</p>
            </IonCardHeader>

            <IonCardContent style={{ padding: '0' }}>
              {historial.map((paso, index) => (
                <IonItem key={index} lines={index === historial.length - 1 ? "none" : "full"} style={{ '--padding-start': '16px' }}>
                  <IonIcon icon={paso.icon} color={paso.color} slot="start" style={{ fontSize: '24px', marginTop: '10px', alignSelf: 'flex-start' }} />
                  <IonLabel className="ion-text-wrap" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <h3 style={{ fontWeight: 'bold', color: 'var(--gob-tertiary)' }}>{paso.estado}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--gob-gray-b)', marginBottom: '4px' }}>{paso.fecha}</p>
                    <p style={{ color: 'var(--gob-gray-a)' }}>{paso.desc}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonCardContent>
          </IonCard>
          
          {/* Botón de acción si el trámite requiere subsanación por parte del ciudadano */}
          <IonButton expand="block" routerLink="/ciudadano/subsanacion" style={{ '--background': 'var(--gob-orange)', fontWeight: 'bold' }}>
            Subsanar Observación
          </IonButton>

        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ '--border': 'none', borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="tramite" routerLink="/ciudadano/ingreso">
            <IonIcon icon={addCircleOutline} />
            <IonLabel>Trámite</IonLabel>
          </IonTabButton>
          <IonTabButton tab="estado" selected style={{ '--color-selected': 'var(--gob-primary)' }}>
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

export default RF02Trazabilidad;