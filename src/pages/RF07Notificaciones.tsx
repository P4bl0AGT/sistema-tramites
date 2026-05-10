import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { mailOpenOutline, notificationsOutline, timeOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import CiudadanoSidebar from '../components/CiudadanoSidebar';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';

const mensajes = [
  {
    id: 1,
    titulo: 'Observación de documento',
    fecha: '06/05/2026 · 09:15',
    resumen: 'Debe reemplazar la copia de la cédula de identidad.',
    cuerpo: (
      <>
        <p>Estimado/a ciudadano/a:</p>
        <p>
          Se informa que el trámite <strong>SD-2026-001</strong> presenta una observación en la documentación adjunta.
          Debe reemplazar la copia de la cédula de identidad por una imagen nítida por ambos lados.
        </p>
        <p>Para continuar, ingrese a la sección de subsanación y adjunte el archivo corregido.</p>
      </>
    ),
  },
  {
    id: 2,
    titulo: 'Trámite en revisión',
    fecha: '05/05/2026 · 10:30',
    resumen: 'El expediente fue asignado a un funcionario municipal.',
    cuerpo: (
      <>
        <p>Su trámite fue derivado a la Dirección de Rentas para revisión documental.</p>
        <p>Recibirá una nueva notificación cuando exista avance o resolución.</p>
      </>
    ),
  },
  {
    id: 3,
    titulo: 'Ingreso exitoso',
    fecha: '04/05/2026 · 16:45',
    resumen: 'El trámite fue ingresado correctamente al sistema.',
    cuerpo: (
      <>
        <p>Su solicitud fue registrada correctamente con el ticket <strong>SD-2026-001</strong>.</p>
        <p>Puede consultar su trazabilidad desde el menú ciudadano.</p>
      </>
    ),
  },
];

const RF07Notificaciones: React.FC = () => {
  const [selectedId, setSelectedId] = useState(1);
  const selected = mensajes.find((m) => m.id === selectedId) ?? mensajes[0];

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent className="muni-ion-content">
        <main className="muni-content-area">
          <div className="muni-main-wrapper">
            <CiudadanoSidebar activePath="/ciudadano/notificaciones" />

            <div className="muni-main-column">
              <section className="muni-hero-card">
                <div className="muni-color-strip" />

                <div className="muni-hero-body muni-hero-body--row">
                  <div>
                    <p className="muni-kicker">RF-07 · Ciudadano</p>
                    <h2 className="muni-heading">Notificaciones</h2>
                    <p className="muni-text">Consulta mensajes del sistema asociados a tus trámites municipales.</p>
                  </div>

                  <span className="muni-pill muni-pill--info">
                    <IonIcon icon={notificationsOutline} />
                    3 mensajes
                  </span>
                </div>
              </section>

              <div className="muni-notif-grid">
                <section className="muni-message-list">
                  {mensajes.map((m) => {
                    const active = selectedId === m.id;

                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedId(m.id)}
                        className={`muni-message-item ${active ? 'is-active' : ''}`}
                      >
                        <div className="muni-message-item__top">
                          <strong>{m.titulo}</strong>
                          <span className="muni-message-date">{m.fecha}</span>
                        </div>

                        <p>{m.resumen}</p>
                      </button>
                    );
                  })}
                </section>

                <section className="muni-message-detail">
                  <div className="muni-message-detail__header">
                    <h3>{selected.titulo}</h3>
                    <span className="muni-text-xs">
                      <IonIcon icon={timeOutline} /> {selected.fecha}
                    </span>
                  </div>

                  <div className="muni-message-detail__body">{selected.cuerpo}</div>

                  <div className="muni-panel-actions">
                    <IonButton routerLink="/ciudadano/subsanacion" className="muni-btn-primary">
                      <IonIcon icon={mailOpenOutline} slot="start" />
                      Abrir acción asociada
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

export default RF07Notificaciones;
