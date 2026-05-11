import {
  IonContent, IonPage,
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton,
  IonLabel, useIonRouter, useIonViewWillEnter
} from '@ionic/react';
import {
  briefcaseOutline, alertCircleOutline, checkboxOutline,
  warningOutline, checkmarkCircleOutline
} from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import FuncionarioSidebar from '../../components/FuncionarioSidebar';
import {
  tramitesService, Tramite, pillStyles, borderColors,
} from '../../services/tramites.service';

const RF04Alertas: React.FC = () => {
  const router = useIonRouter();
  const [urgentes, setUrgentes] = useState<Tramite[]>([]);

  useIonViewWillEnter(() => {
    setUrgentes(tramitesService.getUrgentes());
  });

  const handleRevisar = (id: string) => {
    tramitesService.setSelected(id);
    router.push('/funcionario/revision', 'forward', 'push');
  };

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          <FuncionarioSidebar activePath="/funcionario/alertas" />

          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Ventana */}
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
              <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>RF-04 · Funcionario</p>
                  <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>Alertas de vencimiento</h2>
                  <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>Trámites a 3 días hábiles o menos de vencer que requieren atención prioritaria.</p>
                </div>
                <span style={{ ...pillStyles['danger'], padding: '.35rem .65rem', borderRadius: '999px', fontWeight: 700, fontSize: '.82rem', flexShrink: 0 }}>
                  {urgentes.length} alerta{urgentes.length !== 1 ? 's' : ''} activa{urgentes.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Sin alertas */}
            {urgentes.length === 0 && (
              <div style={{ background: 'white', borderRadius: '10px', padding: '40px', textAlign: 'center', boxShadow: '0 6px 18px rgba(10,19,45,.08)' }}>
                <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '48px', color: '#2D717C', marginBottom: '12px' }} />
                <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700 }}>Sin alertas por vencimiento</h3>
                <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>Todos los trámites están dentro del plazo legal. ¡Buen trabajo!</p>
              </div>
            )}

            {/* tramites urgentes */}
            {urgentes.length > 0 && (
              <>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#ffe9e9', border: '1px solid #f5b8b8', borderRadius: '6px', padding: '12px 14px', marginBottom: '20px' }}>
                  <IonIcon icon={warningOutline} style={{ fontSize: '18px', color: '#8b1f1f', flexShrink: 0, marginTop: '1px' }} />
                  <p style={{ margin: 0, fontSize: '.88rem', color: '#8b1f1f' }}>
                    Existen trámites próximos a vencer. Prioriza la revisión de{' '}
                    <strong>{urgentes.filter(u => u.diasRestantes <= 1).map(u => u.id).join(', ') || urgentes[0].id}</strong>.
                  </p>
                </div>

                {/* Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '16px' }}>
                  {urgentes.map((a) => {
                    const ps = tramitesService.getPillStatus(a.diasRestantes);
                    return (
                      <div key={a.id} style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '10px 14px', borderBottom: '1px solid #e8eef5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                          <span>{a.id}</span>
                          <span style={{ ...pillStyles[ps], padding: '.28rem .6rem', borderRadius: '999px', fontWeight: 700, fontSize: '.78rem' }}>
                            {a.diasRestantes} día{a.diasRestantes !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div style={{ padding: '14px', fontSize: '.86rem', color: '#4A4A4A', flex: 1 }}>
                          <p style={{ margin: '0 0 4px' }}><strong>Tipo:</strong> {tramitesService.getTipoLabel(a.tipo)}</p>
                          <p style={{ margin: '0 0 4px' }}><strong>Ciudadano:</strong> {a.ciudadanoNombre}</p>
                          <p style={{ margin: '0 0 4px' }}><strong>Ingreso:</strong> {a.fechaIngreso}</p>
                          <p style={{ margin: '0 0 14px' }}><strong>Límite:</strong> {a.fechaLimite}</p>
                          <IonButton size="small" onClick={() => handleRevisar(a.id)}
                            style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}>
                            Revisar urgente
                          </IonButton>
                        </div>
                        <div style={{ height: 4, background: borderColors[ps] }} />
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </div>
        </div>

        <PageFooter />
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="bandeja" onClick={() => router.push('/funcionario/bandeja', 'forward', 'push')}><IonIcon icon={briefcaseOutline} /><IonLabel>Bandeja</IonLabel></IonTabButton>
          <IonTabButton tab="alertas" selected style={{ '--color-selected': '#0A132D' }}><IonIcon icon={alertCircleOutline} /><IonLabel>Alertas</IonLabel></IonTabButton>
          <IonTabButton tab="finalizados"><IonIcon icon={checkboxOutline} /><IonLabel>Resueltos</IonLabel></IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF04Alertas;
