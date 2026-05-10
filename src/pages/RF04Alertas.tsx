import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { alertCircleOutline, hourglassOutline, mailOutline, warningOutline } from 'ionicons/icons';
import React from 'react';
import FuncionarioSidebar from '../components/FuncionarioSidebar';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';

type Criticidad = 'Alto' | 'Medio' | 'Controlado';

const alertas = [
  {
    ticket: 'SD-2026-041',
    asunto: 'Patente Comercial',
    plazo: '2 días hábiles',
    responsable: 'Dirección de Rentas',
    criticidad: 'Alto' as Criticidad,
  },
  {
    ticket: 'SD-2026-039',
    asunto: 'Reclamo Municipal',
    plazo: '5 días hábiles',
    responsable: 'OIRS',
    criticidad: 'Medio' as Criticidad,
  },
  {
    ticket: 'SD-2026-032',
    asunto: 'Subsidio Social',
    plazo: '9 días hábiles',
    responsable: 'DIDECO',
    criticidad: 'Controlado' as Criticidad,
  },
];

const getPillClass = (criticidad: Criticidad) => {
  if (criticidad === 'Alto') return 'muni-pill muni-pill--danger';
  if (criticidad === 'Medio') return 'muni-pill muni-pill--warn';
  return 'muni-pill muni-pill--ok';
};

const getStripClass = (criticidad: Criticidad) => {
  if (criticidad === 'Alto') return 'muni-alerta-card__bar muni-alerta-card__bar--danger';
  if (criticidad === 'Medio') return 'muni-alerta-card__bar muni-alerta-card__bar--warn';
  return 'muni-alerta-card__bar muni-alerta-card__bar--ok';
};

const RF04Alertas: React.FC = () => {
  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent className="muni-ion-content">
        <main className="muni-content-area--small">
          <div className="muni-main-wrapper">
            <FuncionarioSidebar activePath="/funcionario/alertas" />

            <div className="muni-main-column">
              <section className="muni-hero-card">
                <div className="muni-color-strip" />

                <div className="muni-hero-body muni-hero-body--row">
                  <div>
                    <p className="muni-kicker">RF-04 · Funcionario</p>
                    <h2 className="muni-heading">Alertas SLA y vencimientos</h2>
                    <p className="muni-text">
                      Detecta trámites próximos a vencer y envía recordatorios a las unidades responsables.
                    </p>
                  </div>

                  <span className="muni-pill muni-pill--warn">
                    <IonIcon icon={hourglassOutline} />
                    Control de plazos
                  </span>
                </div>
              </section>

              <section className="muni-metrics-grid">
                <div className="muni-metric-card muni-metric-card--warn">
                  <strong className="muni-metric-value">4</strong>
                  <span className="muni-metric-label">próximos a vencer</span>
                </div>
                <div className="muni-metric-card muni-metric-card--primary">
                  <strong className="muni-metric-value">2</strong>
                  <span className="muni-metric-label">observados sin respuesta</span>
                </div>
                <div className="muni-metric-card muni-metric-card--ok">
                  <strong className="muni-metric-value">91%</strong>
                  <span className="muni-metric-label">cumplimiento mensual</span>
                </div>
              </section>

              <div className="muni-banner muni-banner--danger">
                <IonIcon icon={warningOutline} />
                <p>
                  La criticidad alta requiere acción antes del cierre del día hábil para evitar incumplimiento.
                </p>
              </div>

              <section className="muni-alertas-grid">
                {alertas.map((alerta) => (
                  <article key={alerta.ticket} className="muni-alerta-card">
                    <div className={getStripClass(alerta.criticidad)} />

                    <div className="muni-alerta-card__header">
                      <span>{alerta.ticket}</span>
                      <span className={getPillClass(alerta.criticidad)}>{alerta.criticidad}</span>
                    </div>

                    <div className="muni-alerta-card__body">
                      <p>
                        <strong>Trámite:</strong> {alerta.asunto}
                      </p>
                      <p>
                        <strong>Plazo restante:</strong> {alerta.plazo}
                      </p>
                      <p>
                        <strong>Responsable:</strong> {alerta.responsable}
                      </p>

                      <IonButton expand="block" className="muni-btn-outline-primary" fill="outline">
                        <IonIcon icon={mailOutline} slot="start" />
                        Enviar recordatorio
                      </IonButton>
                    </div>
                  </article>
                ))}
              </section>

              <div className="muni-banner muni-banner--info">
                <IonIcon icon={alertCircleOutline} />
                <p>
                  Las alertas se calculan según el plazo legal del trámite y la fecha de ingreso registrada.
                </p>
              </div>
            </div>
          </div>
        </main>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default RF04Alertas;
