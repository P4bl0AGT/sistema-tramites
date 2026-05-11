import {
  IonContent, IonPage,
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton,
  IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, useIonRouter, useIonViewWillEnter
} from '@ionic/react';
import {
  briefcaseOutline, alertCircleOutline, checkboxOutline,
  documentTextOutline, imageOutline,
  downloadOutline, checkmarkOutline, alertCircle
} from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import FuncionarioSidebar from '../../components/FuncionarioSidebar';
import { authService } from '../../services/auth.service';
import { tramitesService, Tramite } from '../../services/tramites.service';

const RF05Revision: React.FC = () => {
  const router = useIonRouter();
  const [tramite, setTramite] = useState<Tramite | null>(null);
  const [estadoRevision, setEstadoRevision] = useState('observar');
  const [observacion, setObservacion] = useState('');
  const [guardado, setGuardado] = useState(false);

  useIonViewWillEnter(() => {
    const id = tramitesService.getSelected();
    if (id) {
      const t = tramitesService.getById(id);
      if (t) {
        setTramite(t);
        // Prefill si tiene una observación previa
        if (t.motivoObservacion) setObservacion(t.motivoObservacion);
      }
    }
  });

  const isValid = estadoRevision !== '' &&
    (estadoRevision === 'aprobar' || observacion.trim().length >= 5);

  const handleGuardar = () => {
    if (!tramite) return;
    const user = authService.getCurrentUser();
    const actor = user?.nombre ?? 'Funcionario';

    const estadoMap: Record<string, 'aprobado' | 'rechazado' | 'observado' | 'en_revision'> = {
      aprobar:  'aprobado',
      rechazar: 'rechazado',
      observar: 'observado',
    };

    const nuevoEstado = estadoMap[estadoRevision];
    tramitesService.updateEstado(tramite.id, nuevoEstado, actor, observacion || undefined);
    tramitesService.clearSelected();
    setGuardado(true);
  };

  // ── Documentos del expediente ─────────────────────────────────────────────
  const getDocumentos = () => {
    if (!tramite) return [];
    const docs = [];
    if (tramite.archivoNombre) {
      const ext = tramite.archivoNombre.split('.').pop()?.toLowerCase() ?? '';
      docs.push({
        nombre: tramite.archivoNombre,
        icono: ['jpg', 'jpeg', 'png'].includes(ext) ? imageOutline : documentTextOutline,
        accion: 'ver' as const,
      });
    }
    if (tramite.archivoCorreccionNombre) {
      docs.push({
        nombre: `[CORREGIDO] ${tramite.archivoCorreccionNombre}`,
        icono: documentTextOutline,
        accion: 'ver' as const,
      });
    }
    if (docs.length === 0) {
      docs.push({ nombre: 'Sin documentos adjuntos', icono: documentTextOutline, accion: 'ver' as const });
    }
    return docs;
  };

  if (!tramite) {
    return (
      <IonPage>
        <PageHeader showLogout />
        <IonContent style={{ '--background': '#f5f7fa' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
            <FuncionarioSidebar activePath="/funcionario/revision" />
            <div style={{ flex: 1, background: 'white', borderRadius: '10px', padding: '40px', textAlign: 'center', boxShadow: '0 6px 18px rgba(10,19,45,.08)' }}>
              <IonIcon icon={alertCircle} style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '12px' }} />
              <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700 }}>Ningún trámite seleccionado</h3>
              <p style={{ margin: '0 0 20px', color: '#4A4A4A' }}>Ve a la bandeja y haz clic en "Revisar" sobre un trámite.</p>
              <IonButton onClick={() => router.push('/funcionario/bandeja', 'back', 'pop')}
                style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}>
                Ir a la bandeja
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          <FuncionarioSidebar activePath="/funcionario/revision" />

          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Hero */}
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
              <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>RF-05 · Funcionario</p>
                  <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>Revisión, observación y cambio de estado</h2>
                  <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>
                    Trámite <strong>{tramite.id}</strong> · {tramitesService.getTipoLabel(tramite.tipo)} · Ciudadano: {tramite.ciudadanoNombre}
                  </p>
                </div>
                <span style={{ background: '#e7f1fb', color: '#075d92', padding: '.35rem .65rem', borderRadius: '999px', fontWeight: 700, fontSize: '.82rem', flexShrink: 0 }}>
                  {tramite.diasRestantes} días hábiles
                </span>
              </div>
            </div>

            {/* Confirmación de guardado */}
            {guardado ? (
              <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', padding: '40px', textAlign: 'center' }}>
                <IonIcon icon={checkmarkOutline} style={{ fontSize: '52px', color: '#2D717C', marginBottom: '12px' }} />
                <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700 }}>Evaluación guardada</h3>
                <p style={{ margin: '0 0 20px', color: '#4A4A4A', fontSize: '.92rem' }}>
                  El trámite <strong>{tramite.id}</strong> fue marcado como <strong>{estadoRevision === 'aprobar' ? 'Aprobado' : estadoRevision === 'rechazar' ? 'Rechazado' : 'Observado'}</strong>.
                  El ciudadano será notificado.
                </p>
                <IonButton onClick={() => router.push('/funcionario/bandeja', 'back', 'pop')}
                  style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}>
                  Volver a la bandeja
                </IonButton>
              </div>
            ) : (
              /* ── Two-column layout ── */
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }}>

                {/* Izquierda: documentos */}
                <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                    Expediente {tramite.id}
                  </div>
                  <div style={{ padding: '0 16px' }}>
                    {getDocumentos().map((doc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '.75rem 0', borderBottom: i < getDocumentos().length - 1 ? '1px solid #e8eef5' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '.84rem', color: '#4A4A4A', flex: 1, minWidth: 0 }}>
                          <IonIcon icon={doc.icono} style={{ fontSize: '22px', color: '#006FB3', flexShrink: 0 }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.nombre}</span>
                        </div>
                        <IonButton fill="outline" size="small"
                          style={{ '--color': '#006FB3', '--border-color': '#006FB3', '--border-radius': '4px', margin: 0, flexShrink: 0 }}>
                          Ver
                        </IonButton>
                      </div>
                    ))}
                  </div>

                  {/* Info adicional */}
                  <div style={{ padding: '12px 16px', borderTop: '1px solid #e8eef5', fontSize: '.83rem', color: '#4A4A4A' }}>
                    <p style={{ margin: '0 0 4px' }}><strong>Asunto:</strong> {tramite.asunto}</p>
                    <p style={{ margin: '0 0 4px' }}><strong>Unidad:</strong> {tramite.unidad}</p>
                    <p style={{ margin: 0 }}><strong>Descripción:</strong> {tramite.descripcion.slice(0, 120)}{tramite.descripcion.length > 120 ? '…' : ''}</p>
                  </div>
                </div>

                {/* Derecha: formulario evaluación */}
                <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                    Evaluación
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                        Cambiar estado <span style={{ color: '#FE6565' }}>*</span>
                      </label>
                      <IonItem lines="full" style={{ '--background': '#EEEEEE', '--border-radius': '4px', '--padding-start': '10px' }}>
                        <IonSelect value={estadoRevision} onIonChange={(e) => setEstadoRevision(e.detail.value)}>
                          <IonSelectOption value="aprobar">Aprobar</IonSelectOption>
                          <IonSelectOption value="rechazar">Rechazar</IonSelectOption>
                          <IonSelectOption value="observar">Observar</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                        Motivo explícito {estadoRevision !== 'aprobar' && <span style={{ color: '#FE6565' }}>*</span>}
                      </label>
                      <IonItem lines="full" style={{ '--background': 'white', '--border-color': '#cbd5e1', '--border-radius': '4px' }}>
                        <IonTextarea
                          rows={6}
                          placeholder={estadoRevision === 'aprobar'
                            ? 'Opcional: agrega un comentario de aprobación.'
                            : 'Describe el motivo detalladamente (mín. 5 caracteres).'}
                          value={observacion}
                          onIonInput={(e) => setObservacion(e.detail.value!)}
                        />
                      </IonItem>
                    </div>

                    <IonButton expand="block" onClick={handleGuardar} disabled={!isValid}
                      style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: '0 0 10px' }}>
                      <IonIcon icon={checkmarkOutline} slot="start" />
                      Guardar evaluación
                    </IonButton>

                    <IonButton expand="block" fill="outline" onClick={() => router.push('/funcionario/bandeja', 'back', 'pop')}
                      style={{ '--color': '#4A4A4A', '--border-color': '#cbd5e1', '--border-radius': '4px', fontWeight: 700, margin: 0 }}>
                      Cancelar
                    </IonButton>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        <PageFooter />
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="bandeja" onClick={() => router.push('/funcionario/bandeja', 'back', 'pop')}><IonIcon icon={briefcaseOutline} /><IonLabel>Bandeja</IonLabel></IonTabButton>
          <IonTabButton tab="alertas" onClick={() => router.push('/funcionario/alertas', 'forward', 'push')}><IonIcon icon={alertCircleOutline} /><IonLabel>Alertas</IonLabel></IonTabButton>
          <IonTabButton tab="finalizados"><IonIcon icon={checkboxOutline} /><IonLabel>Resueltos</IonLabel></IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF05Revision;
