import {
  IonContent, IonPage,
  IonButton, IonIcon,
  useIonRouter, useIonViewWillEnter
} from '@ionic/react';
import {
  addCircleOutline,
  informationCircleOutline, checkmarkOutline, searchOutline,
  warningOutline, notifications, documentTextOutline
} from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import CiudadanoSidebar from '../../components/CiudadanoSidebar';
import { authService } from '../../services/auth.service';
import {
  tramitesService, Tramite, EstadoTramite,
  getStepStatus, StepStatus,
} from '../../services/tramites.service';

// Tipos de estados
const TIMELINE_LABELS = [
  { label: 'Ingresado',    sub: (t: Tramite) => t.historial.find(h => h.estado === 'ingresado')?.fecha ?? t.fechaIngreso },
  { label: 'Recepcionado', sub: (t: Tramite) => t.historial.find(h => h.estado === 'recepcionado')?.fecha ?? 'OIRS' },
  { label: 'En revisión',  sub: (t: Tramite) => t.estado === 'en_revision' || t.estado === 'observado' ? 'Funcionario asignado' : 'Pendiente' },
  { label: 'Resolución',   sub: (t: Tramite) => t.estado === 'aprobado' ? 'Aprobado' : t.estado === 'rechazado' ? 'Rechazado' : 'Pendiente' },
  { label: 'Notificación', sub: () => 'Pendiente' },
];

const dotStyle = (status: StepStatus): React.CSSProperties => {
  const base: React.CSSProperties = {
    width: 44, height: 44, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 8px', fontWeight: 700, fontSize: '1rem',
    border: '4px solid #d8e2ec', background: 'white', color: '#8A8A8A',
    position: 'relative', zIndex: 1,
  };
  if (status === 'done')     return { ...base, background: '#2D717C', borderColor: '#2D717C', color: 'white' };
  if (status === 'current')  return { ...base, background: '#006FB3', borderColor: '#006FB3', color: 'white', boxShadow: '0 0 0 6px rgba(0,111,179,.14)' };
  if (status === 'observed') return { ...base, background: '#E0701E', borderColor: '#E0701E', color: 'white' };
  return base;
};

const estadoPillStyle: Record<EstadoTramite, { bg: string; color: string; label: string }> = {
  ingresado:    { bg: '#e7f1fb', color: '#075d92', label: 'Ingresado' },
  recepcionado: { bg: '#e7f1fb', color: '#075d92', label: 'Recepcionado' },
  en_revision:  { bg: '#fff4e5', color: '#8a4b08', label: 'En revisión' },
  observado:    { bg: '#ffe9e9', color: '#8b1f1f', label: 'Observado' },
  aprobado:     { bg: '#e8f5f2', color: '#1d5d64', label: 'Aprobado' },
  rechazado:    { bg: '#ffe9e9', color: '#8b1f1f', label: 'Rechazado' },
};

// Components
const RF02Trazabilidad: React.FC = () => {
  const router = useIonRouter();
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    void (async () => {
      const email = authService.getCurrentEmail();
      if (!email) return;
      const mios = await tramitesService.getByUser(email);
      setTramites(mios);
      if (mios.length > 0) setSelectedId(mios[mios.length - 1].id);
    })();
  });

  const selected = tramites.find(t => t.id === selectedId);
  const pill = selected ? estadoPillStyle[selected.estado] : null;

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          <CiudadanoSidebar activePath="/ciudadano/trazabilidad" />

          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Ventana */}
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
              <div style={{ padding: '20px 24px' }}>
                <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>RF-02 · Ciudadano</p>
                <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>Línea de tiempo y trazabilidad</h2>
                <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>Visualiza la etapa exacta de cada trámite con una línea de tiempo progresiva.</p>
              </div>
            </div>

            {/* Sin trámites */}
            {tramites.length === 0 && (
              <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', padding: '40px', textAlign: 'center' }}>
                <IonIcon icon={documentTextOutline} style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '16px' }} />
                <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700 }}>Sin trámites ingresados</h3>
                <p style={{ margin: '0 0 20px', color: '#4A4A4A', fontSize: '.92rem' }}>Aún no has iniciado ningún trámite en este portal.</p>
                <IonButton onClick={() => router.push('/ciudadano/ingreso', 'forward', 'push')}
                  style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}>
                  <IonIcon icon={addCircleOutline} slot="start" />
                  Ingresar primer trámite
                </IonButton>
              </div>
            )}

            {/* Lista de trámites */}
            {tramites.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '16px', alignItems: 'start' }}>

                {/* Panel izquierdo: lista */}
                <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                    Mis trámites ({tramites.length})
                  </div>
                  {[...tramites].reverse().map((t, i) => {
                    const ps = estadoPillStyle[t.estado];
                    return (
                      <div key={t.id} onClick={() => setSelectedId(t.id)} style={{
                        padding: '12px 16px',
                        borderBottom: i < tramites.length - 1 ? '1px solid #e8eef5' : 'none',
                        cursor: 'pointer',
                        background: selectedId === t.id ? '#e7f1fb' : 'white',
                        borderLeft: selectedId === t.id ? '3px solid #006FB3' : '3px solid transparent',
                        transition: 'background .15s',
                      }}>
                        <strong style={{ display: 'block', fontSize: '.86rem', color: '#0A132D' }}>{t.ticket}</strong>
                        <small style={{ fontSize: '.76rem', color: '#4A4A4A' }}>{tramitesService.getTipoLabel(t.tipo)}</small>
                        <div style={{ marginTop: '6px' }}>
                          <span style={{ ...ps, background: ps.bg, padding: '.2rem .5rem', borderRadius: '999px', fontSize: '.72rem', fontWeight: 700 }}>
                            {ps.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Panel derecho: detalle del seleccionado */}
                {selected && pill && (
                  <div>
                    {/* Linea de tiempo */}
                    <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', padding: '20px 24px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                        <div>
                          <h3 style={{ margin: '0 0 4px', color: '#0A132D', fontWeight: 700, fontSize: '1rem' }}>Ticket {selected.ticket}</h3>
                          <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.88rem' }}>
                            {tramitesService.getTipoLabel(selected.tipo)} · Ingresado el {selected.fechaIngreso}
                          </p>
                        </div>
                        <span style={{ background: pill.bg, color: pill.color, padding: '.35rem .65rem', borderRadius: '999px', fontWeight: 700, fontSize: '.82rem' }}>
                          {pill.label}
                        </span>
                      </div>

                      {/* Linea de tiempo  */}
                      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4px' }}>
                        <div style={{ position: 'absolute', top: 22, left: '8%', right: '8%', height: 4, background: '#d8e2ec', zIndex: 0 }} />
                        {TIMELINE_LABELS.map((step, i) => {
                          const status = getStepStatus(i, selected.estado);
                          return (
                            <div key={i} style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                              <div style={dotStyle(status)}>
                                {status === 'done'     && <IonIcon icon={checkmarkOutline} style={{ fontSize: '18px' }} />}
                                {status === 'current'  && <IonIcon icon={searchOutline}    style={{ fontSize: '18px' }} />}
                                {status === 'observed' && <IonIcon icon={warningOutline}   style={{ fontSize: '18px' }} />}
                                {status === 'pending'  && <span style={{ fontSize: '.85rem', fontWeight: 700 }}>{i + 1}</span>}
                              </div>
                              <strong style={{ display: 'block', fontSize: '.78rem', color: '#0A132D', lineHeight: 1.2 }}>{step.label}</strong>
                              <small style={{ display: 'block', fontSize: '.72rem', color: '#8A8A8A', marginTop: 2 }}>{step.sub(selected)}</small>
                            </div>
                          );
                        })}
                      </div>

                      {/* Observación */}
                      {selected.estado === 'observado' && selected.motivoObservacion && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#ffe9e9', border: '1px solid #f5b8b8', borderRadius: '6px', padding: '12px 14px', marginTop: '24px' }}>
                          <IonIcon icon={warningOutline} style={{ fontSize: '18px', color: '#8b1f1f', flexShrink: 0, marginTop: '1px' }} />
                          <p style={{ margin: 0, fontSize: '.88rem', color: '#8b1f1f' }}>
                            <strong>Motivo de observación:</strong> {selected.motivoObservacion}
                          </p>
                        </div>
                      )}

                      {/* Info */}
                      {selected.estado !== 'observado' && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#e7f1fb', border: '1px solid #b6d4ef', borderRadius: '6px', padding: '12px 14px', marginTop: '24px' }}>
                          <IonIcon icon={informationCircleOutline} style={{ fontSize: '18px', color: '#075d92', flexShrink: 0, marginTop: '1px' }} />
                          <p style={{ margin: 0, fontSize: '.88rem', color: '#075d92' }}>
                            La municipalidad notificará cualquier cambio de estado al correo registrado.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Botone s */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>Datos del trámite</div>
                        <div style={{ padding: '14px 16px', fontSize: '.86rem', color: '#4A4A4A' }}>
                          <p style={{ margin: '0 0 8px' }}><strong>Unidad:</strong> {selected.unidad}</p>
                          <p style={{ margin: '0 0 8px' }}><strong>Fecha límite:</strong> {selected.fechaLimite}</p>
                          <p style={{ margin: '0 0 8px' }}><strong>Días hábiles restantes:</strong> {selected.diasRestantes}</p>
                          <p style={{ margin: 0 }}><strong>Plazo legal:</strong> {selected.plazoLegal} días hábiles</p>
                        </div>
                      </div>

                      <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>Acciones disponibles</div>
                        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <IonButton expand="block" routerLink="/ciudadano/notificaciones"
                            style={{ '--background': '#006FB3', '--border-radius': '4px', margin: 0, fontWeight: 700 }}>
                            <IonIcon icon={notifications} slot="start" />
                            Ver notificaciones
                          </IonButton>
                          {selected.estado === 'observado' && (
                            <IonButton expand="block" fill="outline"
                              onClick={() => { tramitesService.setSelected(selected.id); router.push('/ciudadano/subsanacion', 'forward', 'push'); }}
                              style={{ '--color': '#E0701E', '--border-color': '#E0701E', '--border-radius': '4px', margin: 0, fontWeight: 700 }}>
                              Subsanar observación
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

export default RF02Trazabilidad;
