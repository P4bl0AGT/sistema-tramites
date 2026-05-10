import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton, 
  IonButtons, IonLabel, useIonRouter
} from '@ionic/react';
import { 
  addCircleOutline, listOutline, chatbubbleEllipsesOutline, 
  logOutOutline, informationCircleOutline, documentTextOutline,
  checkmarkOutline, searchOutline, notifications
} from 'ionicons/icons';
import React from 'react';

const handleLogout = () => {
  window.location.href = '/login';
};

// ── Timeline data ────────────────────────────────────────────────────────────
type StepStatus = 'done' | 'current' | 'observed' | 'pending';

const timelineSteps: { label: string; sub: string; status: StepStatus }[] = [
  { label: 'Ingresado',     sub: '04/05/2026',         status: 'done'    },
  { label: 'Recepcionado',  sub: 'OIRS',               status: 'done'    },
  { label: 'En revisión',   sub: 'Funcionario asignado', status: 'current' },
  { label: 'Resolución',    sub: 'Pendiente',           status: 'pending' },
  { label: 'Notificación',  sub: 'Pendiente',           status: 'pending' },
];

const dotStyle = (status: StepStatus): React.CSSProperties => {
  const base: React.CSSProperties = {
    width: 44, height: 44,
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 8px',
    fontWeight: 700, fontSize: '1rem',
    border: '4px solid #d8e2ec',
    background: 'white',
    color: '#8A8A8A',
    position: 'relative', zIndex: 1,
  };
  if (status === 'done')     return { ...base, background: '#2D717C', borderColor: '#2D717C', color: 'white' };
  if (status === 'current')  return { ...base, background: '#006FB3', borderColor: '#006FB3', color: 'white', boxShadow: '0 0 0 6px rgba(0,111,179,.14)' };
  if (status === 'observed') return { ...base, background: '#E0701E', borderColor: '#E0701E', color: 'white' };
  return base;
};

// ── Component ─────────────────────────────────────────────────────────────────
const RF02Trazabilidad: React.FC = () => {
  const router = useIonRouter();

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

      <IonContent className="ion-padding" style={{ '--background': '#f5f7fa' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>

          {/* ── Hero card ── */}
          <div style={{
            background: 'white', borderRadius: '12px',
            boxShadow: '0 14px 35px rgba(10,19,45,.10)',
            overflow: 'hidden', marginBottom: '20px'
          }}>
            <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
            <div style={{ padding: '20px 24px' }}>
              <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>
                RF-02 · Ciudadano
              </p>
              <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>
                Línea de tiempo y trazabilidad
              </h2>
              <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>
                Visualiza la etapa exacta del trámite con una línea de tiempo progresiva.
              </p>
            </div>
          </div>

          {/* ── Timeline card ── */}
          <div style={{
            background: 'white', borderRadius: '10px',
            boxShadow: '0 6px 18px rgba(10,19,45,.08)',
            padding: '20px 24px', marginBottom: '16px'
          }}>
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px', color: '#0A132D', fontWeight: 700, fontSize: '1rem' }}>Ticket SD-2026-041</h3>
                <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.88rem' }}>Patente Comercial · Ingresado el 04/05/2026</p>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '.35rem',
                padding: '.35rem .65rem', borderRadius: '999px',
                fontWeight: 700, fontSize: '.82rem',
                background: '#fff4e5', color: '#8a4b08'
              }}>
                En revisión documental
              </span>
            </div>

            {/* Timeline horizontal */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4px' }}>
              {/* Connector line */}
              <div style={{
                position: 'absolute', top: 22, left: '8%', right: '8%',
                height: 4, background: '#d8e2ec', zIndex: 0
              }} />
              {timelineSteps.map((step, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={dotStyle(step.status)}>
                    {step.status === 'done'    && <IonIcon icon={checkmarkOutline} style={{ fontSize: '18px' }} />}
                    {step.status === 'current' && <IonIcon icon={searchOutline}    style={{ fontSize: '18px' }} />}
                    {step.status === 'pending' && <span style={{ fontSize: '.85rem', fontWeight: 700 }}>{i + 1}</span>}
                  </div>
                  <strong style={{ display: 'block', fontSize: '.78rem', color: '#0A132D', lineHeight: 1.2 }}>{step.label}</strong>
                  <small style={{ display: 'block', fontSize: '.72rem', color: '#8A8A8A', marginTop: 2 }}>{step.sub}</small>
                </div>
              ))}
            </div>

            {/* Info alert */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '10px',
              background: '#e7f1fb', border: '1px solid #b6d4ef',
              borderRadius: '6px', padding: '12px 14px', marginTop: '24px'
            }}>
              <IonIcon icon={informationCircleOutline} style={{ fontSize: '18px', color: '#075d92', flexShrink: 0, marginTop: '1px' }} />
              <p style={{ margin: 0, fontSize: '.88rem', color: '#075d92' }}>
                La municipalidad notificará cualquier cambio de estado al correo registrado.
              </p>
            </div>
          </div>

          {/* ── Bottom cards row ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' }}>

            {/* Datos del trámite */}
            <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                Datos del trámite
              </div>
              <div style={{ padding: '14px 16px', fontSize: '.86rem', color: '#4A4A4A' }}>
                <p style={{ margin: '0 0 8px' }}><strong>Unidad:</strong> Dir. de Rentas y Patentes.</p>
                <p style={{ margin: '0 0 8px' }}><strong>Fecha límite:</strong> 03/06/2026.</p>
                <p style={{ margin: 0 }}><strong>Plazo legal:</strong> 20 días hábiles.</p>
              </div>
            </div>

            {/* Acciones disponibles */}
            <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                Acciones disponibles
              </div>
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <IonButton
                  expand="block"
                  routerLink="/ciudadano/notificaciones"
                  style={{ '--background': '#006FB3', '--border-radius': '4px', margin: 0, fontWeight: 700 }}
                >
                  <IonIcon icon={notifications} slot="start" />
                  Ver notificación
                </IonButton>
              </div>
            </div>

          </div>

        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="tramite" routerLink="/ciudadano/ingreso">
            <IonIcon icon={addCircleOutline} />
            <IonLabel>Trámite</IonLabel>
          </IonTabButton>
          <IonTabButton tab="estado" selected style={{ '--color-selected': 'var(--gob-primary)' }}>
            <IonIcon icon={listOutline} />
            <IonLabel>Estado</IonLabel>
          </IonTabButton>
          <IonTabButton tab="avisos" onClick={() => router.push('/ciudadano/notificaciones', 'forward', 'push')}>
            <IonIcon icon={chatbubbleEllipsesOutline} />
            <IonLabel>Avisos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF02Trazabilidad;