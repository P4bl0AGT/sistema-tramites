import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonList, IonItem, IonLabel, IonBadge, IonButton, 
  IonIcon, IonFooter, IonTabBar, IonTabButton, IonButtons,
  IonSearchbar, IonChip
} from '@ionic/react';
import { briefcaseOutline, alertCircleOutline, checkboxOutline, logOutOutline } from 'ionicons/icons';
import React from 'react';

const RF03Bandeja: React.FC = () => {
  // Datos de ejemplo simulando lo que vendrá de la base de datos
  const tramites = [
    { id: 'T-2026-001', tipo: 'Patente Comercial', dias: 5, estado: 'Pendiente', color: 'warning' },
    { id: 'T-2026-002', tipo: 'Reclamo Municipal', dias: 12, estado: 'En Revisión', color: 'primary' },
    { id: 'T-2026-003', tipo: 'Subsidio Social', dias: 2, estado: 'Urgente', color: 'danger' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--gob-tertiary)', '--color': 'white' }}>
          <IonTitle>Panel de Gestión</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/login">
              <IonIcon icon={logOutOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar style={{ '--background': 'var(--gob-tertiary)' }}>
          <IonSearchbar placeholder="Buscar expediente..." style={{ '--background': 'white' }} />
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--gob-neutral)' }}>
        <div className="ion-padding">
          <h2 style={{ color: 'var(--gob-tertiary)', fontWeight: 'bold' }}>Bandeja de Entrada</h2>
          <p style={{ color: 'var(--gob-gray-a)' }}>Trámites asignados a su unidad fiscalizadora.</p>
          
          <IonList lines="none" style={{ background: 'transparent' }}>
            {tramites.map((t, index) => (
              <IonItem key={index} className="ion-margin-bottom" 
                style={{ 
                  '--border-radius': '10px', 
                  'boxShadow': '0 2px 8px rgba(0,0,0,0.05)',
                  'borderLeft': `6px solid var(--gob-${t.color === 'warning' ? 'orange' : t.color === 'danger' ? 'secondary' : 'primary'})`
                }}>
                <IonLabel>
                  <h3 style={{ fontWeight: 'bold' }}>{t.id}</h3>
                  <p>{t.tipo}</p>
                  <IonChip outline color={t.color} style={{ fontSize: '12px', marginTop: '5px' }}>
                    {t.estado}
                  </IonChip>
                </IonLabel>
                <div slot="end" style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', margin: '0' }}>Plazo restante</p>
                  <IonBadge color={t.color} style={{ padding: '5px 10px' }}>{t.dias} días</IonBadge>
                  <br />
                  <IonButton fill="clear" size="small" routerLink="/funcionario/revision">Ver</IonButton>
                </div>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ '--border': 'none', borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="bandeja" selected style={{ '--color-selected': 'var(--gob-tertiary)' }}>
            <IonIcon icon={briefcaseOutline} />
            <IonLabel>Bandeja</IonLabel>
          </IonTabButton>
          <IonTabButton tab="alertas">
            <IonIcon icon={alertCircleOutline} />
            <IonLabel>Alertas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="finalizados">
            <IonIcon icon={checkboxOutline} />
            <IonLabel>Resueltos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF03Bandeja;