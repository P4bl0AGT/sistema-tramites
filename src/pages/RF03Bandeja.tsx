import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { alertCircleOutline, documentTextOutline, eyeOutline, timeOutline } from 'ionicons/icons';
import React from 'react';
import FuncionarioSidebar from '../components/FuncionarioSidebar';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';

type EstadoTramite = 'Nuevo' | 'En revisión' | 'Observado';

const pendientes = [
  {
    ticket: 'SD-2026-041',
    tipo: 'Patente Comercial',
    ciudadano: 'María González',
    fecha: '04/05/2026',
    estado: 'Nuevo' as EstadoTramite,
  },
  {
    ticket: 'SD-2026-039',
    tipo: 'Reclamo Municipal',
    ciudadano: 'Juan Pérez',
    fecha: '03/05/2026',
    estado: 'En revisión' as EstadoTramite,
  },
  {
    ticket: 'SD-2026-035',
    tipo: 'Subsidio Social',
    ciudadano: 'Camila Soto',
    fecha: '30/04/2026',
    estado: 'Observado' as EstadoTramite,
  },
];

const getPillClass = (estado: EstadoTramite) => {
  if (estado === 'Nuevo') return 'muni-pill muni-pill--info';
  if (estado === 'En revisión') return 'muni-pill muni-pill--warn';
  return 'muni-pill muni-pill--danger';
};

const RF03Bandeja: React.FC = () => {
  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent className="muni-ion-content">
        <main className="muni-content-area--small">
          <div className="muni-main-wrapper">
            <FuncionarioSidebar activePath="/funcionario/bandeja" />

            <div className="muni-main-column">
              <section className="muni-hero-card">
                <div className="muni-color-strip" />

                <div className="muni-hero-body muni-hero-body--row">
                  <div>
                    <p className="muni-kicker">RF-03 · Funcionario</p>
                    <h2 className="muni-heading">Bandeja de entrada de trámites</h2>
                    <p className="muni-text">
                      Revisa solicitudes ciudadanas, prioriza por estado y accede a la ficha del trámite.
                    </p>
                  </div>

                  <span className="muni-pill muni-pill--info">
                    <IonIcon icon={documentTextOutline} />
                    Gestión documental
                  </span>
                </div>
              </section>

              <section className="muni-metrics-grid">
                <div className="muni-metric-card muni-metric-card--primary">
                  <strong className="muni-metric-value">12</strong>
                  <span className="muni-metric-label">pendientes de revisión</span>
                </div>

                <div className="muni-metric-card muni-metric-card--warn">
                  <strong className="muni-metric-value">4</strong>
                  <span className="muni-metric-label">cerca del SLA</span>
                </div>

                <div className="muni-metric-card muni-metric-card--ok">
                  <strong className="muni-metric-value">27</strong>
                  <span className="muni-metric-label">resueltos este mes</span>
                </div>
              </section>

              <section className="muni-tramites-grid">
                {pendientes.map((item) => (
                  <article key={item.ticket} className="muni-tramite-card">
                    <div className="muni-tramite-card__header">
                      <span>{item.ticket}</span>
                      <span className={getPillClass(item.estado)}>{item.estado}</span>
                    </div>

                    <div className="muni-tramite-card__body">
                      <p>
                        <strong>Tipo:</strong> {item.tipo}
                      </p>
                      <p>
                        <strong>Ciudadano:</strong> {item.ciudadano}
                      </p>
                      <p>
                        <strong>Ingreso:</strong> {item.fecha}
                      </p>

                      <IonButton
                        expand="block"
                        routerLink="/funcionario/revision"
                        className="muni-btn-primary"
                      >
                        <IonIcon icon={eyeOutline} slot="start" />
                        Revisar expediente
                      </IonButton>
                    </div>
                  </article>
                ))}
              </section>

              <div className="muni-banner muni-banner--warn">
                <IonIcon icon={alertCircleOutline} />
                <p>
                  Recuerda registrar observaciones claras para que el ciudadano pueda subsanar sin volver
                  a consultar por el mismo documento.
                </p>
              </div>

              <div className="muni-card">
                <div className="muni-card__header">Actividad reciente</div>
                <div className="muni-document-row">
                  <div className="muni-document-info">
                    <IonIcon icon={timeOutline} className="muni-document-icon" />
                    <span className="muni-document-name">SD-2026-041 asignado a revisión documental.</span>
                  </div>
                  <span className="muni-text-xs">hace 10 min</span>
                </div>
                <div className="muni-document-row">
                  <div className="muni-document-info">
                    <IonIcon icon={timeOutline} className="muni-document-icon" />
                    <span className="muni-document-name">SD-2026-039 actualizado a “En revisión”.</span>
                  </div>
                  <span className="muni-text-xs">hace 1 h</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default RF03Bandeja;
