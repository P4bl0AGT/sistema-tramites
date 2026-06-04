import {
  IonContent, IonPage,
  IonButton, IonIcon,
  useIonRouter, useIonViewWillEnter
} from '@ionic/react';
import {
  addCircleOutline,
  mailOutline, documentTextOutline
} from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import CiudadanoSidebar from '../../components/CiudadanoSidebar';
import { authService } from '../../services/auth.service';
import { tramitesService, Tramite, EstadoTramite } from '../../services/tramites.service';

// Tipos
interface Notificacion {
  id: string;
  tramiteId: string;   // id numérico string (para setSelected y API)
  tramiteTicket: string; // TRK-XXXX (para display)
  tipoLabel: string;
  titulo: string;
  fecha: string;
  pillLabel: string;
  pillStyle: React.CSSProperties;
  h3: string;
  cuerpo: string;
  motivo?: string;
  accionLink: string;
  accionLabel: string;
  estado: EstadoTramite;
}

// Estados
const NOTIF_ESTADOS: EstadoTramite[] = ['recepcionado', 'observado', 'aprobado', 'rechazado'];

const pillStylesMap: Record<string, React.CSSProperties> = {
  recepcionado: { background: '#e7f1fb', color: '#075d92' },
  observado:    { background: '#ffe9e9', color: '#8b1f1f' },
  aprobado:     { background: '#e8f5f2', color: '#1d5d64' },
  rechazado:    { background: '#ffe9e9', color: '#8b1f1f' },
};

const TIPO_LABELS: Record<string, string> = {
  reclamo:  'Reclamo Municipal',
  patente:  'Patente Comercial',
  licencia: 'Licencia de Conducir',
  subsidio: 'Subsidio Social',
};

// plantillas notificaciones 
const buildNotificaciones = (tramites: Tramite[]): Notificacion[] => {
  const notifs: Notificacion[] = [];

  tramites.forEach((t) => {
    const tipoLabel = TIPO_LABELS[t.tipo] ?? t.tipo;

    t.historial.forEach((h, i) => {
      if (!NOTIF_ESTADOS.includes(h.estado)) return;

      let titulo = '';
      let pillLabel = '';
      let h3 = '';
      let cuerpo = '';
      let accionLink = '/ciudadano/trazabilidad';
      let accionLabel = 'Ver trazabilidad';

      switch (h.estado) {
        case 'recepcionado':
          titulo    = 'Recepción confirmada';
          pillLabel = 'Recibido';
          h3        = 'Tu trámite fue recibido exitosamente';
          cuerpo    = `El trámite ${t.ticket} · ${tipoLabel} fue recibido por la oficina de partes y está siendo procesado. No se requiere ninguna acción por tu parte. Te notificaremos ante cualquier cambio de estado.`;
          break;
        case 'observado':
          titulo    = 'Trámite observado';
          pillLabel = 'Observado';
          h3        = 'Tu trámite requiere una corrección';
          cuerpo    = `El trámite ${t.ticket} · ${tipoLabel} cambió de estado a Observado. Acción requerida: Ingresa al portal y sube únicamente el documento corregido antes del vencimiento del plazo legal.`;
          accionLink  = '/ciudadano/subsanacion';
          accionLabel = 'Corregir documentación';
          break;
        case 'aprobado':
          titulo    = 'Solicitud aprobada';
          pillLabel = 'Aprobado';
          h3        = 'Tu solicitud fue aprobada';
          cuerpo    = `El trámite ${t.ticket} · ${tipoLabel} fue aprobado por la unidad correspondiente. Puedes consultar el detalle en el portal de trazabilidad.`;
          break;
        case 'rechazado':
          titulo    = 'Solicitud rechazada';
          pillLabel = 'Rechazado';
          h3        = 'Tu solicitud fue rechazada';
          cuerpo    = `El trámite ${t.ticket} · ${tipoLabel} fue rechazado. Puedes consultar el motivo detallado en el portal de trazabilidad.`;
          break;
      }

      notifs.push({
        id:           `${t.ticket}_${h.estado}_${i}`,
        tramiteId:    t.id,
        tramiteTicket: t.ticket,
        tipoLabel,
        titulo,
        fecha:      h.fecha,
        pillLabel,
        pillStyle:  pillStylesMap[h.estado] ?? {},
        h3,
        cuerpo,
        motivo:     h.estado === 'observado' ? (t.motivoObservacion ?? h.motivo) : undefined,
        accionLink,
        accionLabel,
        estado:     h.estado,
      });
    });
  });

  return notifs.reverse();
};

// Components
const RF07Notificaciones: React.FC = () => {
  const router = useIonRouter();
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    void (async () => {
      const email = authService.getCurrentEmail();
      if (!email) return;
      const tramites = await tramitesService.getByUser(email);
      const notifs = buildNotificaciones(tramites);
      setNotificaciones(notifs);
      if (notifs.length > 0) setSelectedId(notifs[0].id);
    })();
  });

  const selected = notificaciones.find(n => n.id === selectedId);
  const email = authService.getCurrentEmail() ?? 'ciudadano@correo.cl';

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          <CiudadanoSidebar activePath="/ciudadano/notificaciones" />

          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Ventana */}
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
              <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>
                    RF-07 · Ciudadano
                  </p>
                  <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>
                    Notificaciones multicanal
                  </h2>
                  <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>
                    Vista de notificación tipo correo con cambio de estado y motivo claro.
                  </p>
                </div>
                <span style={{ background: '#e7f1fb', color: '#075d92', padding: '.35rem .65rem', borderRadius: '999px', fontWeight: 700, fontSize: '.82rem', flexShrink: 0 }}>
                  {notificaciones.length} mensaje{notificaciones.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* no hay notificaciones  */}
            {notificaciones.length === 0 && (
              <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', padding: '40px', textAlign: 'center' }}>
                <IonIcon icon={documentTextOutline} style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '12px' }} />
                <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700 }}>Sin notificaciones</h3>
                <p style={{ margin: '0 0 20px', color: '#4A4A4A', fontSize: '.92rem' }}>
                  Cuando realices un trámite, las notificaciones de cambio de estado aparecerán aquí.
                </p>
                <IonButton onClick={() => router.push('/ciudadano/ingreso', 'forward', 'push')}
                  style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}>
                  <IonIcon icon={addCircleOutline} slot="start" />
                  Ingresar primer trámite
                </IonButton>
              </div>
            )}

            {/* segunda columna */}
            {notificaciones.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '16px', alignItems: 'start' }}>

                {/* Izquierda: lista de mensajes */}
                <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                    Centro de mensajes
                  </div>
                  {notificaciones.map((n, i) => (
                    <div
                      key={n.id}
                      onClick={() => setSelectedId(n.id)}
                      style={{
                        padding: '12px 16px',
                        borderBottom: i < notificaciones.length - 1 ? '1px solid #e8eef5' : 'none',
                        cursor: 'pointer',
                        background: selectedId === n.id ? '#006FB3' : 'white',
                        transition: 'background .15s',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '.88rem', color: selectedId === n.id ? 'white' : '#0A132D' }}>
                        {n.titulo}
                      </strong>
                      <small style={{ fontSize: '.78rem', color: selectedId === n.id ? 'rgba(255,255,255,.8)' : '#8A8A8A' }}>
                        {n.tramiteTicket} · {n.fecha}
                      </small>
                    </div>
                  ))}
                </div>

                {/* Derecha: vista tipo correo */}
                {selected && (
                  <div style={{ border: '1px solid #d7dee8', borderRadius: '10px', overflow: 'hidden', background: 'white', boxShadow: '0 6px 18px rgba(10,19,45,.06)' }}>
                    <div style={{ background: '#f1f5f9', padding: '.85rem 1rem', borderBottom: '1px solid #d7dee8', fontSize: '.84rem', color: '#4A4A4A', lineHeight: 1.6 }}>
                      <div><strong>De:</strong> Municipalidad de Santo Domingo &lt;tramites@santodomingo.cl&gt;</div>
                      <div><strong>Para:</strong> {email}</div>
                      <div><strong>Asunto:</strong> Cambio de estado del trámite {selected.tramiteTicket}</div>
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
                        {selected.motivo && (
                          <p style={{ margin: '0 0 10px', fontSize: '.9rem', color: '#4A4A4A' }}>
                            <strong>Motivo:</strong> {selected.motivo}
                          </p>
                        )}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
                          <IonButton
                            size="small"
                            onClick={() => {
                              if (selected.estado === 'observado') {
                                tramitesService.setSelected(selected.tramiteId);
                              }
                              router.push(selected.accionLink, 'forward', 'push');
                            }}
                            style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                          >
                            {selected.accionLabel}
                          </IonButton>
                          {selected.accionLink !== '/ciudadano/trazabilidad' && (
                            <IonButton
                              size="small"
                              fill="outline"
                              onClick={() => router.push('/ciudadano/trazabilidad', 'forward', 'push')}
                              style={{ '--color': '#006FB3', '--border-color': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                            >
                              Ver trazabilidad
                            </IonButton>
                          )}
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
