import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  useIonRouter,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  addCircleOutline,
  checkmarkDoneOutline,
  documentTextOutline,
  mailOutline,
  trashOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import CiudadanoSidebar from '../../components/CiudadanoSidebar';
import { authService } from '../../services/auth.service';
import {
  notificacionesService,
  NotificacionVista,
} from '../../services/notificaciones.service';
import { tramitesService } from '../../services/tramites.service';

const RF07Notificaciones: React.FC = () => {
  const router = useIonRouter();
  const [notificaciones, setNotificaciones] = useState<NotificacionVista[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const cargarNotificaciones = async () => {
    const notifs = await notificacionesService.getAll();
    setNotificaciones(notifs);
    setSelectedId((current) => current ?? notifs[0]?.id ?? null);
  };

  useIonViewWillEnter(() => {
    void cargarNotificaciones();
  });

  const selected = notificaciones.find((n) => n.id === selectedId);
  const email = authService.getCurrentEmail() ?? 'ciudadano@correo.cl';
  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  const handleSelect = async (notificacion: NotificacionVista) => {
    setSelectedId(notificacion.id);
    if (notificacion.leida) return;

    await notificacionesService.markRead(notificacion.id);
    setNotificaciones((items) =>
      items.map((item) => item.id === notificacion.id ? { ...item, leida: true } : item)
    );
  };

  const handleMarkAll = async () => {
    await notificacionesService.markAllRead();
    setNotificaciones((items) => items.map((item) => ({ ...item, leida: true })));
  };

  const handleDelete = async (id: string) => {
    await notificacionesService.remove(id);
    setNotificaciones((items) => {
      const next = items.filter((item) => item.id !== id);
      if (selectedId === id) setSelectedId(next[0]?.id ?? null);
      return next;
    });
  };

  const goToAction = (notificacion: NotificacionVista) => {
    if (notificacion.tramiteId) {
      tramitesService.setSelected(notificacion.tramiteId);
    }
    router.push(notificacion.accionLink, 'forward', 'push');
  };

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
          <CiudadanoSidebar activePath="/ciudadano/notificaciones" />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
              <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>
                    RF-07 - Ciudadano
                  </p>
                  <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>
                    Notificaciones multicanal
                  </h2>
                  <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>
                    Vista tipo correo conectada al centro de mensajes del backend.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ background: noLeidas > 0 ? '#fff4e5' : '#e7f1fb', color: noLeidas > 0 ? '#8a4b08' : '#075d92', padding: '.35rem .65rem', borderRadius: '999px', fontWeight: 700, fontSize: '.82rem', flexShrink: 0 }}>
                    {noLeidas} sin leer
                  </span>
                  {notificaciones.length > 0 && (
                    <IonButton
                      size="small"
                      fill="outline"
                      onClick={handleMarkAll}
                      style={{ '--color': '#006FB3', '--border-color': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                    >
                      <IonIcon icon={checkmarkDoneOutline} slot="start" />
                      Marcar leidas
                    </IonButton>
                  )}
                </div>
              </div>
            </div>

            {notificaciones.length === 0 && (
              <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', padding: '40px', textAlign: 'center' }}>
                <IonIcon icon={documentTextOutline} style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '12px' }} />
                <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700 }}>Sin notificaciones</h3>
                <p style={{ margin: '0 0 20px', color: '#4A4A4A', fontSize: '.92rem' }}>
                  Cuando realices un tramite, los cambios de estado apareceran aqui.
                </p>
                <IonButton
                  onClick={() => router.push('/ciudadano/ingreso', 'forward', 'push')}
                  style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}
                >
                  <IonIcon icon={addCircleOutline} slot="start" />
                  Ingresar primer tramite
                </IonButton>
              </div>
            )}

            {notificaciones.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) minmax(0, 1.6fr)', gap: '16px', alignItems: 'start' }}>
                <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                    Centro de mensajes ({notificaciones.length})
                  </div>
                  {notificaciones.map((n, i) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => void handleSelect(n)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        border: 'none',
                        borderBottom: i < notificaciones.length - 1 ? '1px solid #e8eef5' : 'none',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        background: selectedId === n.id ? '#006FB3' : 'white',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '.88rem', color: selectedId === n.id ? 'white' : '#0A132D', fontWeight: n.leida ? 600 : 800 }}>
                        {n.titulo}
                      </strong>
                      <small style={{ fontSize: '.78rem', color: selectedId === n.id ? 'rgba(255,255,255,.8)' : '#8A8A8A' }}>
                        {n.tramiteTicket} - {n.fecha}
                      </small>
                    </button>
                  ))}
                </div>

                {selected && (
                  <div style={{ border: '1px solid #d7dee8', borderRadius: '10px', overflow: 'hidden', background: 'white', boxShadow: '0 6px 18px rgba(10,19,45,.06)' }}>
                    <div style={{ background: '#f1f5f9', padding: '.85rem 1rem', borderBottom: '1px solid #d7dee8', fontSize: '.84rem', color: '#4A4A4A', lineHeight: 1.6 }}>
                      <div><strong>De:</strong> Municipalidad de Santo Domingo &lt;tramites@santodomingo.cl&gt;</div>
                      <div><strong>Para:</strong> {email}</div>
                      <div><strong>Asunto:</strong> Cambio de estado del tramite {selected.tramiteTicket}</div>
                    </div>
                    <div style={{ padding: '16px' }}>
                      <div style={{ borderLeft: '6px solid #006FB3', background: 'white', borderRadius: '8px', padding: '16px' }}>
                        <span style={{ ...selected.pillStyle, display: 'inline-flex', alignItems: 'center', gap: '.35rem', padding: '.35rem .65rem', borderRadius: '999px', fontWeight: 700, fontSize: '.82rem', marginBottom: '12px' }}>
                          <IonIcon icon={mailOutline} style={{ fontSize: '13px' }} />
                          {selected.pillLabel}
                        </span>
                        <h3 style={{ margin: '0 0 12px', color: '#0A132D', fontWeight: 700, fontSize: '1rem' }}>
                          {selected.h3}
                        </h3>
                        <p style={{ margin: '0 0 10px', fontSize: '.9rem', color: '#4A4A4A' }}>
                          {selected.cuerpo}
                        </p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
                          <IonButton
                            size="small"
                            onClick={() => goToAction(selected)}
                            style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                          >
                            {selected.accionLabel}
                          </IonButton>
                          <IonButton
                            size="small"
                            fill="outline"
                            onClick={() => void handleDelete(selected.id)}
                            style={{ '--color': '#8b1f1f', '--border-color': '#f5b8b8', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                          >
                            <IonIcon icon={trashOutline} slot="start" />
                            Eliminar
                          </IonButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default RF07Notificaciones;
