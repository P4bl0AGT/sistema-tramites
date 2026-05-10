import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton, IonButtons,
  IonLabel, useIonRouter
} from '@ionic/react';
import { 
  addCircleOutline, listOutline, chatbubbleEllipsesOutline, 
  logOutOutline, mailOutline
} from 'ionicons/icons';
import React, { useState } from 'react';

const navLinks = [
  { label: 'Iniciar trámite', href: '/ciudadano/ingreso' },
  { label: 'Trazabilidad',    href: '/ciudadano/trazabilidad' },
  { label: 'Subsanación',     href: '/ciudadano/subsanacion' },
  { label: 'Notificaciones',  href: '/ciudadano/notificaciones' },
];

// ── Data ──────────────────────────────────────────────────────────────────────
interface Mensaje {
  id: number;
  titulo: string;
  ticket: string;
  fecha: string;
  pillLabel: string;
  pillStyle: React.CSSProperties;
  h3: string;
  cuerpo: React.ReactNode;
  accionLink: string;
  accionLabel: string;
}

const mensajes: Mensaje[] = [
  {
    id: 1,
    titulo: 'Trámite observado',
    ticket: 'SD-2026-041',
    fecha: 'hoy',
    pillLabel: 'Observado',
    pillStyle: { background: '#ffe9e9', color: '#8b1f1f' },
    h3: 'Tu trámite requiere una corrección',
    cuerpo: (
      <>
        <p style={{ margin: '0 0 10px', fontSize: '.9rem', color: '#4A4A4A' }}>
          El trámite <strong>SD-2026-041 · Patente Comercial</strong> cambió de estado a <strong>Observado</strong>.
        </p>
        <p style={{ margin: '0 0 10px', fontSize: '.9rem', color: '#4A4A4A' }}>
          <strong>Motivo:</strong> La copia de la cédula de identidad está ilegible y debe ser reemplazada por una imagen nítida por ambos lados.
        </p>
        <p style={{ margin: '0 0 16px', fontSize: '.9rem', color: '#4A4A4A' }}>
          <strong>Acción requerida:</strong> Ingresa al portal y sube únicamente el documento corregido antes del vencimiento del plazo legal.
        </p>
      </>
    ),
    accionLink: '/ciudadano/subsanacion',
    accionLabel: 'Corregir documentación',
  },
  {
    id: 2,
    titulo: 'Recepción confirmada',
    ticket: 'SD-2026-039',
    fecha: 'ayer',
    pillLabel: 'Recibido',
    pillStyle: { background: '#e7f1fb', color: '#075d92' },
    h3: 'Tu trámite fue recibido exitosamente',
    cuerpo: (
      <>
        <p style={{ margin: '0 0 10px', fontSize: '.9rem', color: '#4A4A4A' }}>
          El trámite <strong>SD-2026-039 · Reclamo Municipal</strong> fue recibido por la oficina de partes y está siendo procesado.
        </p>
        <p style={{ margin: '0 0 16px', fontSize: '.9rem', color: '#4A4A4A' }}>
          <strong>Acción requerida:</strong> Ninguna. Te notificaremos ante cualquier cambio de estado.
        </p>
      </>
    ),
    accionLink: '/ciudadano/trazabilidad',
    accionLabel: 'Ver trazabilidad',
  },
  {
    id: 3,
    titulo: 'Solicitud aprobada',
    ticket: 'SD-2026-030',
    fecha: '02/05/2026',
    pillLabel: 'Aprobado',
    pillStyle: { background: '#e8f5f2', color: '#1d5d64' },
    h3: 'Tu solicitud fue aprobada',
    cuerpo: (
      <>
        <p style={{ margin: '0 0 10px', fontSize: '.9rem', color: '#4A4A4A' }}>
          El trámite <strong>SD-2026-030 · Subsidio Social</strong> fue aprobado por la unidad correspondiente.
        </p>
        <p style={{ margin: '0 0 16px', fontSize: '.9rem', color: '#4A4A4A' }}>
          Puedes descargar la resolución oficial desde el portal de trazabilidad.
        </p>
      </>
    ),
    accionLink: '/ciudadano/trazabilidad',
    accionLabel: 'Ver resolución',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const RF07Notificaciones: React.FC = () => {
  const router = useIonRouter();
  const [selectedId, setSelectedId] = useState(1);
  const selected = mensajes.find(m => m.id === selectedId)!;

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#006FB3', '--color': 'white' }}>
          <IonTitle>Avisos y Notificaciones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          {/* ── Sidebar ── */}
          <aside style={{
            flexShrink: 0, width: '200px', background: 'white',
            borderRadius: '10px', boxShadow: '0 8px 22px rgba(10,19,45,.10)',
            overflow: 'hidden', borderLeft: '5px solid #006FB3',
            position: 'sticky', top: '24px',
          }}>
            <div style={{ padding: '12px 14px 10px', fontWeight: 700, color: '#0A132D', fontSize: '.85rem', borderBottom: '1px solid #e8eef5', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IonIcon icon={listOutline} style={{ fontSize: '15px', color: '#006FB3' }} />
              Ciudadano
            </div>
            <nav style={{ padding: '6px 0' }}>
              {navLinks.map(({ label, href }) => {
                const isActive = window.location.pathname === href ||
                  (href === '/ciudadano/notificaciones' && window.location.pathname.endsWith('/notificaciones'));
                return (
                  <div key={href} onClick={() => router.push(href, 'forward', 'push')} style={{
                    padding: '9px 14px', cursor: 'pointer',
                    background: isActive ? '#e7f1fb' : 'transparent',
                    color: isActive ? '#006FB3' : '#4A4A4A',
                    fontWeight: isActive ? 700 : 400, fontSize: '.88rem',
                    borderLeft: isActive ? '3px solid #006FB3' : '3px solid transparent',
                  }}>
                    {label}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* ── Contenido principal ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── Hero card ── */}
          <div style={{
            background: 'white', borderRadius: '12px',
            boxShadow: '0 14px 35px rgba(10,19,45,.10)',
            overflow: 'hidden', marginBottom: '20px'
          }}>
            <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
            <div style={{ padding: '20px 24px' }}>
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
          </div>

          {/* ── Two-column layout ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '16px', alignItems: 'start' }}>

            {/* ── Left: message list ── */}
            <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                Centro de mensajes
              </div>
              {mensajes.map((m, i) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: i < mensajes.length - 1 ? '1px solid #e8eef5' : 'none',
                    cursor: 'pointer',
                    background: selectedId === m.id ? '#006FB3' : 'white',
                    transition: 'background .15s',
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '.88rem', color: selectedId === m.id ? 'white' : '#0A132D' }}>
                    {m.titulo}
                  </strong>
                  <small style={{ fontSize: '.78rem', color: selectedId === m.id ? 'rgba(255,255,255,.8)' : '#8A8A8A' }}>
                    {m.ticket} · {m.fecha}
                  </small>
                </div>
              ))}
            </div>

            {/* ── Right: mail window ── */}
            <div style={{ border: '1px solid #d7dee8', borderRadius: '10px', overflow: 'hidden', background: 'white', boxShadow: '0 6px 18px rgba(10,19,45,.06)' }}>
              {/* Mail header */}
              <div style={{ background: '#f1f5f9', padding: '.85rem 1rem', borderBottom: '1px solid #d7dee8', fontSize: '.84rem', color: '#4A4A4A', lineHeight: 1.6 }}>
                <div><strong>De:</strong> Municipalidad de Santo Domingo &lt;tramites@santodomingo.cl&gt;</div>
                <div><strong>Para:</strong> ciudadano@correo.cl</div>
                <div><strong>Asunto:</strong> Cambio de estado del trámite {selected.ticket}</div>
              </div>

              {/* Mail body */}
              <div style={{ padding: '16px' }}>
                <div style={{ borderLeft: '6px solid #006FB3', background: 'white', borderRadius: '8px', padding: '16px' }}>
                  <span style={{
                    ...selected.pillStyle,
                    display: 'inline-flex', alignItems: 'center', gap: '.35rem',
                    padding: '.35rem .65rem', borderRadius: '999px',
                    fontWeight: 700, fontSize: '.82rem',
                    marginBottom: '12px'
                  }}>
                    <IonIcon icon={mailOutline} style={{ fontSize: '13px' }} />
                    {selected.pillLabel}
                  </span>

                  <h3 style={{ margin: '0 0 12px', color: '#0A132D', fontWeight: 700, fontSize: '1rem' }}>
                    {selected.h3}
                  </h3>

                  {selected.cuerpo}

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <IonButton
                      size="small"
                      onClick={() => router.push(selected.accionLink, 'forward', 'push')}
                      style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                    >
                      {selected.accionLabel}
                    </IonButton>
                    <IonButton
                      size="small"
                      fill="outline"
                      onClick={() => router.push('/ciudadano/trazabilidad', 'forward', 'push')}
                      style={{ '--color': '#006FB3', '--border-color': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                    >
                      Ver trazabilidad
                    </IonButton>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>{/* fin main */}
        </div>{/* fin flex wrapper */}
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="tramite" routerLink="/ciudadano/ingreso">
            <IonIcon icon={addCircleOutline} />
            <IonLabel>Trámite</IonLabel>
          </IonTabButton>
          <IonTabButton tab="estado" routerLink="/ciudadano/trazabilidad">
            <IonIcon icon={listOutline} />
            <IonLabel>Estado</IonLabel>
          </IonTabButton>
          <IonTabButton tab="avisos" selected style={{ '--color-selected': '#006FB3' }}>
            <IonIcon icon={chatbubbleEllipsesOutline} />
            <IonLabel>Avisos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF07Notificaciones;