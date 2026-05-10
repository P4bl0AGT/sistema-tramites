import { 
  IonContent, IonPage,
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton, 
  IonLabel, useIonRouter
} from '@ionic/react';
import { 
  briefcaseOutline, alertCircleOutline, checkboxOutline, 
  warningOutline
} from 'ionicons/icons';
import React from 'react';

import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const funcLinks = [
  { label: 'Bandeja',  href: '/funcionario/bandeja' },
  { label: 'Alertas',  href: '/funcionario/alertas' },
  { label: 'Revisión', href: '/funcionario/revision' },
];

// ── Types ─────────────────────────────────────────────────────────────────────
type PillStatus = 'warn' | 'danger' | 'ok';

interface Alerta {
  id: string;
  tipo: string;
  fechaIngreso: string;
  documentos: number;
  diasRestantes: number;
  pillStatus: PillStatus;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const alertas: Alerta[] = [
  { id: 'SD-2026-041', tipo: 'Patente Comercial',    fechaIngreso: '04/05/2026', documentos: 4, diasRestantes: 3,  pillStatus: 'warn'   },
  { id: 'SD-2026-044', tipo: 'Reclamo',              fechaIngreso: '29/04/2026', documentos: 2, diasRestantes: 1,  pillStatus: 'danger' },
  { id: 'SD-2026-047', tipo: 'Licencia de Conducir', fechaIngreso: '06/05/2026', documentos: 3, diasRestantes: 12, pillStatus: 'ok'     },
];

const pillStyles: Record<PillStatus, React.CSSProperties> = {
  warn:   { background: '#fff4e5', color: '#8a4b08' },
  danger: { background: '#ffe9e9', color: '#8b1f1f' },
  ok:     { background: '#e8f5f2', color: '#1d5d64' },
};

const borderColors: Record<PillStatus, string> = {
  warn:   '#E0701E',
  danger: '#FE6565',
  ok:     '#2D717C',
};

// ── Component ─────────────────────────────────────────────────────────────────
const RF04Alertas: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          <aside style={{
            flexShrink: 0, width: '200px', background: 'white',
            borderRadius: '10px', boxShadow: '0 8px 22px rgba(10,19,45,.10)',
            overflow: 'hidden', borderLeft: '5px solid #0A132D',
            position: 'sticky', top: '24px',
          }}>
            <div style={{ padding: '12px 14px 10px', fontWeight: 700, color: '#0A132D', fontSize: '.85rem', borderBottom: '1px solid #e8eef5', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IonIcon icon={briefcaseOutline} style={{ fontSize: '15px', color: '#0A132D' }} />
              Funcionario
            </div>
            <nav style={{ padding: '6px 0' }}>
              {funcLinks.map(({ label, href }) => {
                const isActive = window.location.pathname === href ||
                  (href === '/funcionario/alertas' && window.location.pathname.endsWith('/alertas'));
                return (
                  <div key={href} onClick={() => router.push(href, 'forward', 'push')} style={{
                    padding: '9px 14px', cursor: 'pointer',
                    background: isActive ? '#e8eaf0' : 'transparent',
                    color: isActive ? '#0A132D' : '#4A4A4A',
                    fontWeight: isActive ? 700 : 400, fontSize: '.88rem',
                    borderLeft: isActive ? '3px solid #0A132D' : '3px solid transparent',
                  }}>
                    {label}
                  </div>
                );
              })}
            </nav>
          </aside>

          <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── Hero card ── */}
          <div style={{
            background: 'white', borderRadius: '12px',
            boxShadow: '0 14px 35px rgba(10,19,45,.10)',
            overflow: 'hidden', marginBottom: '20px'
          }}>
            <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
            <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>
                  RF-04 · Funcionario
                </p>
                <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>
                  Alertas de vencimiento
                </h2>
                <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>
                  Trámites a 3 días hábiles o menos de vencer que requieren atención prioritaria.
                </p>
              </div>
              <span style={{
                ...pillStyles['danger'],
                padding: '.35rem .65rem', borderRadius: '999px',
                fontWeight: 700, fontSize: '.82rem', flexShrink: 0
              }}>
                3 alertas activas
              </span>
            </div>
          </div>

          {/* ── Danger banner ── */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            background: '#ffe9e9', border: '1px solid #f5b8b8',
            borderRadius: '6px', padding: '12px 14px', marginBottom: '20px'
          }}>
            <IonIcon icon={warningOutline} style={{ fontSize: '18px', color: '#8b1f1f', flexShrink: 0, marginTop: '1px' }} />
            <p style={{ margin: 0, fontSize: '.88rem', color: '#8b1f1f' }}>
              Existen trámites próximos a vencer. Prioriza la revisión de <strong>SD-2026-044</strong> y <strong>SD-2026-041</strong>.
            </p>
          </div>

          {/* ── Alerta cards grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {alertas.map((a) => (
              <div key={a.id} style={{
                background: 'white', borderRadius: '10px',
                boxShadow: '0 6px 18px rgba(10,19,45,.08)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column'
              }}>
                {/* Card header */}
                <div style={{
                  padding: '10px 14px', borderBottom: '1px solid #e8eef5',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontWeight: 700, color: '#0A132D', fontSize: '.88rem'
                }}>
                  <span>{a.id}</span>
                  <span style={{
                    ...pillStyles[a.pillStatus],
                    padding: '.28rem .6rem', borderRadius: '999px',
                    fontWeight: 700, fontSize: '.78rem'
                  }}>
                    {a.diasRestantes} día{a.diasRestantes !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Card body */}
                <div style={{ padding: '14px', fontSize: '.86rem', color: '#4A4A4A', flex: 1 }}>
                  <p style={{ margin: '0 0 6px' }}><strong>Tipo:</strong> {a.tipo}</p>
                  <p style={{ margin: '0 0 6px' }}><strong>Fecha ingreso:</strong> {a.fechaIngreso}</p>
                  <p style={{ margin: '0 0 6px' }}><strong>Documentos:</strong> {a.documentos} adjuntos</p>
                  <p style={{ margin: '0 0 14px' }}><strong>Días hábiles:</strong> {a.diasRestantes}</p>
                  <IonButton
                    size="small"
                    onClick={() => router.push('/funcionario/revision', 'forward', 'push')}
                    style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                  >
                    Revisar
                  </IonButton>
                </div>

                {/* Bottom border accent */}
                <div style={{ height: 4, background: borderColors[a.pillStatus] }} />
              </div>
            ))}
          </div>

        </div>{/* fin main */}
        </div>{/* fin flex wrapper */}

        <PageFooter />
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="bandeja" onClick={() => router.push('/funcionario/bandeja', 'forward', 'push')}>
            <IonIcon icon={briefcaseOutline} />
            <IonLabel>Bandeja</IonLabel>
          </IonTabButton>
          <IonTabButton tab="alertas" selected style={{ '--color-selected': '#0A132D' }}>
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

export default RF04Alertas;