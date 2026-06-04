import {
  IonContent, IonPage,
  IonButton, IonIcon,
  IonItem, IonTextarea, useIonRouter, useIonViewWillEnter
} from '@ionic/react';
import {
  warningOutline, downloadOutline, checkmarkCircleOutline, alertCircle
} from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import CiudadanoSidebar from '../../components/CiudadanoSidebar';
import { authService } from '../../services/auth.service';
import { tramitesService, Tramite } from '../../services/tramites.service';

const RF06Subsanacion: React.FC = () => {
  const router = useIonRouter();
  const [tramite, setTramite] = useState<Tramite | null>(null);
  const [comentario, setComentario] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [enviado, setEnviado] = useState(false);

  useIonViewWillEnter(() => {
    void (async () => {
      const selectedId = tramitesService.getSelected();
      if (selectedId) {
        const t = await tramitesService.getById(selectedId);
        if (t && t.estado === 'observado') { setTramite(t); return; }
      }
      const email = authService.getCurrentEmail();
      if (email) {
        const todos = await tramitesService.getByUser(email);
        const observados = todos.filter(t => t.estado === 'observado');
        setTramite(observados.length > 0 ? observados[observados.length - 1] : null);
      }
    })();
  });

  const isValid = archivo !== null || comentario.trim().length >= 5;

  const handleSubsanar = async () => {
    if (!tramite) return;
    const user = authService.getCurrentUser();
    const actor = user?.nombre ?? 'Ciudadano';
    await tramitesService.subsanar(tramite.id, actor, archivo, comentario || undefined);
    tramitesService.clearSelected();
    setEnviado(true);
  };

  // Fecha de la última observación
  const entradaObservacion = [...tramite?.historial ?? []].reverse().find(h => h.estado === 'observado');
  const fechaObservacion = entradaObservacion?.fecha ?? tramite?.fechaIngreso ?? '—';

  // no hay tramites aún
  if (!tramite) {
    return (
      <IonPage>
        <PageHeader showLogout />
        <IonContent style={{ '--background': '#f5f7fa' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
            <CiudadanoSidebar activePath="/ciudadano/subsanacion" />
            <div style={{ flex: 1, background: 'white', borderRadius: '10px', padding: '40px', textAlign: 'center', boxShadow: '0 6px 18px rgba(10,19,45,.08)' }}>
              <IonIcon icon={alertCircle} style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '12px' }} />
              <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700 }}>Sin trámites observados</h3>
              <p style={{ margin: '0 0 20px', color: '#4A4A4A' }}>No tienes trámites pendientes de subsanación en este momento.</p>
              <IonButton onClick={() => router.push('/ciudadano/trazabilidad', 'back', 'pop')}
                style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}>
                Ver trazabilidad
              </IonButton>
            </div>
          </div>
          <PageFooter />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          <CiudadanoSidebar activePath="/ciudadano/subsanacion" />

          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Ventana */}
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden', marginBottom: '20px' }}>
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
                    Trámite <strong>{tramite.ticket}</strong> · Revisa el motivo de la observación y sube solo los documentos corregidos.
                  </p>
                </div>
                <span style={{ background: '#ffe9e9', color: '#8b1f1f', padding: '.35rem .65rem', borderRadius: '999px', fontWeight: 700, fontSize: '.82rem', flexShrink: 0 }}>
                  Observado
                </span>
              </div>
            </div>

            {/* Confirmación tras envío */}
            {enviado ? (
              <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', padding: '40px', textAlign: 'center' }}>
                <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '52px', color: '#2D717C', marginBottom: '12px' }} />
                <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700 }}>Subsanación enviada</h3>
                <p style={{ margin: '0 0 20px', color: '#4A4A4A', fontSize: '.92rem' }}>
                  El trámite <strong>{tramite.ticket}</strong> volvió a estado <strong>En revisión</strong>.
                  El funcionario evaluará los documentos corregidos.
                </p>
                <IonButton onClick={() => router.push('/ciudadano/trazabilidad', 'back', 'pop')}
                  style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}>
                  Ver trazabilidad
                </IonButton>
              </div>
            ) : (
              <>
                {/* observacion + métrica */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', marginBottom: '16px', alignItems: 'start' }}>

                  <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                      Motivo de observación
                    </div>
                    <div style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#ffe9e9', border: '1px solid #f5b8b8', borderRadius: '6px', padding: '12px 14px', marginBottom: '14px' }}>
                        <IonIcon icon={warningOutline} style={{ fontSize: '18px', color: '#8b1f1f', flexShrink: 0, marginTop: '1px' }} />
                        <p style={{ margin: 0, fontSize: '.88rem', color: '#8b1f1f' }}>
                          {tramite.motivoObservacion ?? 'El funcionario no especificó un motivo adicional.'}
                        </p>
                      </div>
                      <p style={{ margin: '0 0 6px', fontSize: '.86rem', color: '#4A4A4A' }}><strong>Ticket:</strong> {tramite.ticket}</p>
                      <p style={{ margin: '0 0 6px', fontSize: '.86rem', color: '#4A4A4A' }}><strong>Fecha de observación:</strong> {fechaObservacion}</p>
                      <p style={{ margin: 0, fontSize: '.86rem', color: '#4A4A4A' }}><strong>Plazo restante:</strong> {tramite.diasRestantes} días hábiles para corregir.</p>
                    </div>
                  </div>

                  <div style={{ background: 'white', borderRadius: '10px', padding: '16px', borderLeft: '5px solid #006FB3', boxShadow: '0 6px 18px rgba(10,19,45,.06)', minWidth: '120px', textAlign: 'left' }}>
                    <strong style={{ display: 'block', fontSize: '1.8rem', color: '#0A132D', fontWeight: 700, lineHeight: 1.1 }}>{tramite.diasRestantes}</strong>
                    <span style={{ fontSize: '.82rem', color: '#4A4A4A' }}>días hábiles disponibles.</span>
                  </div>

                </div>

                {/* Subir Documento  */}
                <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                    Subir documentos corregidos
                  </div>

                  <div style={{ padding: '16px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                        Documento corregido <span style={{ color: '#FE6565' }}>*</span>
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)}
                        style={{ width: '100%', padding: '10px', background: '#EEEEEE', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '.86rem' }}
                      />
                      {archivo && (
                        <p style={{ margin: '6px 0 0', fontSize: '.82rem', color: '#2D717C' }}>✓ {archivo.name}</p>
                      )}
                    </div>

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
              </>
            )}

          </div>
        </div>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default RF06Subsanacion;
