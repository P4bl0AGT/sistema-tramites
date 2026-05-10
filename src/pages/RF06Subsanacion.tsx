import {
  IonContent, IonPage,
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton,
  IonItem, IonLabel, IonTextarea, useIonRouter
} from '@ionic/react';
import {
  addCircleOutline, listOutline, chatbubbleEllipsesOutline,
  warningOutline, downloadOutline
} from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const navLinks = [
  { label: 'Iniciar trámite', href: '/ciudadano/ingreso' },
  { label: 'Trazabilidad',    href: '/ciudadano/trazabilidad' },
  { label: 'Subsanación',     href: '/ciudadano/subsanacion' },
  { label: 'Notificaciones',  href: '/ciudadano/notificaciones' },
];

const RF06Subsanacion: React.FC = () => {
  const router = useIonRouter();
  const [comentario, setComentario] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);

  const handleSubsanar = () => {
    router.push('/ciudadano/trazabilidad', 'forward', 'push');
  };

  const isValid = archivo !== null || comentario.trim().length >= 5;

  return (
    <IonPage>
      <PageHeader showLogout />

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
                  (href === '/ciudadano/subsanacion' && window.location.pathname.endsWith('/subsanacion'));

                return (
                  <div
                    key={href}
                    onClick={() => router.push(href, 'forward', 'push')}
                    style={{
                      padding: '9px 14px',
                      cursor: 'pointer',
                      background: isActive ? '#e7f1fb' : 'transparent',
                      color: isActive ? '#006FB3' : '#4A4A4A',
                      fontWeight: isActive ? 700 : 400,
                      fontSize: '.88rem',
                      borderLeft: isActive ? '3px solid #006FB3' : '3px solid transparent',
                    }}
                  >
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
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 14px 35px rgba(10,19,45,.10)',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />

              <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>
                    RF-06 · Ciudadano
                  </p>

                  <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>
                    Subsanación y rectificación
                  </h2>

                  <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>
                    Revisa el motivo de la observación y sube solo los documentos corregidos o faltantes.
                  </p>
                </div>

                <span style={{
                  background: '#ffe9e9',
                  color: '#8b1f1f',
                  padding: '.35rem .65rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '.82rem',
                  flexShrink: 0
                }}>
                  Observado
                </span>
              </div>
            </div>

            {/* ── Top row: observacion card + metric ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', marginBottom: '16px', alignItems: 'start' }}>

              {/* Motivo de observación */}
              <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                  Motivo de observación
                </div>

                <div style={{ padding: '16px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    background: '#ffe9e9',
                    border: '1px solid #f5b8b8',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    marginBottom: '14px'
                  }}>
                    <IonIcon icon={warningOutline} style={{ fontSize: '18px', color: '#8b1f1f', flexShrink: 0, marginTop: '1px' }} />

                    <p style={{ margin: 0, fontSize: '.88rem', color: '#8b1f1f' }}>
                      <strong>Documento ilegible:</strong> La copia de la cédula de identidad no permite verificar el número de serie. Debe subir una imagen nítida por ambos lados.
                    </p>
                  </div>

                  <p style={{ margin: '0 0 6px', fontSize: '.86rem', color: '#4A4A4A' }}>
                    <strong>Ticket:</strong> SD-2026-041
                  </p>

                  <p style={{ margin: '0 0 6px', fontSize: '.86rem', color: '#4A4A4A' }}>
                    <strong>Fecha de observación:</strong> 07/05/2026
                  </p>

                  <p style={{ margin: 0, fontSize: '.86rem', color: '#4A4A4A' }}>
                    <strong>Plazo restante:</strong> 8 días hábiles para corregir.
                  </p>
                </div>
              </div>

              {/* Metric días */}
              <div style={{
                background: 'white',
                borderRadius: '10px',
                padding: '16px',
                borderLeft: '5px solid #006FB3',
                boxShadow: '0 6px 18px rgba(10,19,45,.06)',
                minWidth: '120px',
                textAlign: 'left'
              }}>
                <strong style={{ display: 'block', fontSize: '1.8rem', color: '#0A132D', fontWeight: 700, lineHeight: 1.1 }}>
                  8
                </strong>

                <span style={{ fontSize: '.82rem', color: '#4A4A4A' }}>
                  días hábiles disponibles.
                </span>
              </div>

            </div>

            {/* ── Upload form card ── */}
            <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                Subir documentos corregidos
              </div>

              <div style={{ padding: '16px' }}>

                {/* File input — cédula corregida */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                    Cédula de identidad corregida <span style={{ color: '#FE6565' }}>*</span>
                  </label>

                  <input
                    type="file"
                    onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)}
                    style={{ width: '100%', padding: '10px', background: '#EEEEEE', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '.86rem' }}
                  />

                  {archivo && (
                    <p style={{ margin: '6px 0 0', fontSize: '.82rem', color: '#2D717C' }}>
                      ✓ {archivo.name}
                    </p>
                  )}
                </div>

                {/* Comentario */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                    Comentario para el funcionario
                  </label>

                  <IonItem lines="full" style={{ '--background': 'white', '--border-color': '#cbd5e1', '--border-radius': '4px' }}>
                    <IonTextarea
                      placeholder="Ej: Subo nuevamente el documento en mejor calidad."
                      rows={4}
                      value={comentario}
                      onIonInput={(e) => setComentario(e.detail.value!)}
                    />
                  </IonItem>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <IonButton
                    onClick={handleSubsanar}
                    disabled={!isValid}
                    style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, flex: '1 1 160px' }}
                  >
                    <IonIcon icon={downloadOutline} slot="start" />
                    Enviar subsanación
                  </IonButton>

                  <IonButton
                    fill="outline"
                    onClick={() => router.push('/ciudadano/trazabilidad', 'back', 'pop')}
                    style={{ '--color': '#006FB3', '--border-color': '#006FB3', '--border-radius': '4px', fontWeight: 700, flex: '1 1 160px' }}
                  >
                    Volver a trazabilidad
                  </IonButton>
                </div>

              </div>
            </div>

          </div>{/* fin main */}
        </div>{/* fin flex wrapper */}

        <PageFooter />
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="tramite" onClick={() => router.push('/ciudadano/ingreso', 'forward', 'push')}>
            <IonIcon icon={addCircleOutline} />
            <IonLabel>Trámite</IonLabel>
          </IonTabButton>

          <IonTabButton tab="estado" selected style={{ '--color-selected': '#006FB3' }} onClick={() => router.push('/ciudadano/trazabilidad', 'back', 'pop')}>
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

export default RF06Subsanacion;