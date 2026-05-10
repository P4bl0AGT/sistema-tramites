import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { checkmarkOutline, documentTextOutline, refreshOutline, timeOutline, warningOutline } from 'ionicons/icons';
import React from 'react';
import CiudadanoSidebar from '../components/CiudadanoSidebar';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';

type StepStatus = 'done' | 'current' | 'observed' | 'pending';

const steps: Array<{ label: string; sub: string; status: StepStatus; icon: string }> = [
  { label: 'Ingresado', sub: '04/05/2026', status: 'done', icon: checkmarkOutline },
  { label: 'Revisión documental', sub: 'Funcionario asignado', status: 'current', icon: timeOutline },
  { label: 'Observación', sub: 'Pendiente si aplica', status: 'pending', icon: warningOutline },
  { label: 'Resolución', sub: 'Finalización', status: 'pending', icon: documentTextOutline },
];

const getDotClass = (status: StepStatus) => {
  if (status === 'done') return 'muni-timeline-dot muni-timeline-dot--done';
  if (status === 'current') return 'muni-timeline-dot muni-timeline-dot--current';
  if (status === 'observed') return 'muni-timeline-dot muni-timeline-dot--observed';
  return 'muni-timeline-dot';
};

const RF02Trazabilidad: React.FC = () => {
  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent className="muni-ion-content">
        <main className="muni-content-area">
          <div className="muni-main-wrapper">
            <CiudadanoSidebar activePath="/ciudadano/trazabilidad" />

            <div className="muni-main-column">
              <section className="muni-hero-card">
                <div className="muni-color-strip" />

                <div className="muni-hero-body muni-hero-body--row">
                  <div>
                    <p className="muni-kicker">RF-02 · Ciudadano</p>
                    <h2 className="muni-heading">Trazabilidad de trámite</h2>
                    <p className="muni-text">Visualiza estados, fechas y responsables del expediente electrónico.</p>
                  </div>

                  <span className="muni-pill muni-pill--info">
                    <IonIcon icon={documentTextOutline} />
                    SD-2026-001
                  </span>
                </div>
              </section>

              <section className="muni-timeline-card">
                <div className="muni-timeline-header">
                  <div>
                    <h3>Patente Comercial</h3>
                    <p>Última actualización: 05/05/2026 · 10:30 hrs</p>
                  </div>

                  <span className="muni-pill muni-pill--warn">En revisión</span>
                </div>

                <div className="muni-timeline">
                  {steps.map((step) => (
                    <div key={step.label} className="muni-timeline-step">
                      <div className={getDotClass(step.status)}>
                        <IonIcon icon={step.icon} />
                      </div>

                      <span className="muni-timeline-label">{step.label}</span>
                      <span className="muni-timeline-sub">{step.sub}</span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="muni-bottom-grid">
                <section className="muni-panel-card">
                  <div className="muni-panel-header">Detalle del expediente</div>

                  <div className="muni-panel-body">
                    <p>
                      <strong>Tipo:</strong> Patente Comercial
                    </p>
                    <p>
                      <strong>Unidad responsable:</strong> Dirección de Rentas
                    </p>
                    <p>
                      <strong>Funcionario:</strong> Ana Torres
                    </p>
                    <p>
                      <strong>Estado actual:</strong> Revisión documental
                    </p>
                  </div>
                </section>

                <section className="muni-panel-card">
                  <div className="muni-panel-header">Acciones disponibles</div>

                  <div className="muni-panel-actions">
                    <IonButton expand="block" routerLink="/ciudadano/subsanacion" className="muni-btn-primary">
                      <IonIcon icon={warningOutline} slot="start" />
                      Ir a subsanación
                    </IonButton>

                    <IonButton expand="block" fill="outline" routerLink="/ciudadano/ingreso" className="muni-btn-outline-primary">
                      <IonIcon icon={refreshOutline} slot="start" />
                      Ingresar otro trámite
                    </IonButton>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default RF02Trazabilidad;
