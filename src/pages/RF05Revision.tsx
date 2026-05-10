import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton, IonButtons,
  IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, useIonRouter
} from '@ionic/react';
import { 
  briefcaseOutline, alertCircleOutline, checkboxOutline, 
  logOutOutline, documentTextOutline, imageOutline, 
  downloadOutline, checkmarkOutline
} from 'ionicons/icons';
import React, { useState } from 'react';

// ── Document list ─────────────────────────────────────────────────────────────
interface DocRow {
  nombre: string;
  icono: string;  // ionicon name string
  accion: 'ver' | 'descargar' | 'ilegible';
}

const documentos: DocRow[] = [
  { nombre: 'Formulario de solicitud.pdf', icono: 'documentText',  accion: 'ver'       },
  { nombre: 'Cédula identidad.jpg',        icono: 'image',         accion: 'ilegible'  },
  { nombre: 'Inicio actividades.pdf',      icono: 'documentText',  accion: 'ver'       },
  { nombre: 'Plano local.pdf',             icono: 'download',      accion: 'descargar' },
];

const iconMap: Record<string, any> = {
  documentText: documentTextOutline,
  image:        imageOutline,
  download:     downloadOutline,
};

// ── Component ─────────────────────────────────────────────────────────────────
const RF05Revision: React.FC = () => {
  const router = useIonRouter();
  const [estadoRevision, setEstadoRevision] = useState('observar');
  const [observacion, setObservacion] = useState(
    'La copia de la cédula de identidad está ilegible. Debe subir una imagen nítida por ambos lados.'
  );

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const handleGuardar = () => {
    router.push('/funcionario/bandeja', 'back', 'pop');
  };

  const isValid = estadoRevision !== '' && (estadoRevision === 'aprobar' || observacion.trim().length >= 5);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#0A132D', '--color': 'white' }}>
          <IonTitle>Revisión de Trámite</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '16px' }}>

          {/* ── Hero card ── */}
          <div style={{
            background: 'white', borderRadius: '12px',
            boxShadow: '0 14px 35px rgba(10,19,45,.10)',
            overflow: 'hidden', marginBottom: '20px'
          }}>
            <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
            <div style={{ padding: '20px 24px' }}>
              <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>
                RF-05 · Funcionario
              </p>
              <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>
                Revisión, observación y cambio de estado
              </h2>
              <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>
                Evalúa documentos, cambia estado y registra motivo explícito para aprobación, rechazo u observación.
              </p>
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }}>

            {/* ── Left: document list ── */}
            <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                Expediente SD-2026-041
              </div>
              <div style={{ padding: '0 16px' }}>
                {documentos.map((doc, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '10px', padding: '.75rem 0',
                    borderBottom: i < documentos.length - 1 ? '1px solid #e8eef5' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '.84rem', color: '#4A4A4A', flex: 1, minWidth: 0 }}>
                      <IonIcon icon={iconMap[doc.icono]} style={{ fontSize: '22px', color: '#006FB3', flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.nombre}</span>
                    </div>
                    {doc.accion === 'ilegible' ? (
                      <span style={{
                        background: '#ffe9e9', color: '#8b1f1f',
                        padding: '.28rem .6rem', borderRadius: '999px',
                        fontWeight: 700, fontSize: '.75rem', flexShrink: 0
                      }}>
                        Ilegible
                      </span>
                    ) : (
                      <IonButton
                        fill="outline"
                        size="small"
                        style={{ '--color': '#006FB3', '--border-color': '#006FB3', '--border-radius': '4px', margin: 0, flexShrink: 0 }}
                      >
                        {doc.accion === 'ver' ? 'Ver' : 'Descargar'}
                      </IonButton>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: evaluation form ── */}
            <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                Evaluación
              </div>
              <div style={{ padding: '16px' }}>

                {/* Estado select */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                    Cambiar estado <span style={{ color: '#FE6565' }}>*</span>
                  </label>
                  <IonItem lines="full" style={{ '--background': '#EEEEEE', '--border-radius': '4px', '--padding-start': '10px' }}>
                    <IonSelect
                      value={estadoRevision}
                      onIonChange={(e) => setEstadoRevision(e.detail.value)}
                    >
                      <IonSelectOption value="aprobar">Aprobar</IonSelectOption>
                      <IonSelectOption value="rechazar">Rechazar</IonSelectOption>
                      <IonSelectOption value="observar">Observar</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </div>

                {/* Motivo textarea */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                    Motivo explícito <span style={{ color: '#FE6565' }}>*</span>
                  </label>
                  <IonItem lines="full" style={{ '--background': 'white', '--border-color': '#cbd5e1', '--border-radius': '4px' }}>
                    <IonTextarea
                      rows={6}
                      value={observacion}
                      onIonInput={(e) => setObservacion(e.detail.value!)}
                    />
                  </IonItem>
                </div>

                {/* Guardar */}
                <IonButton
                  expand="block"
                  onClick={handleGuardar}
                  disabled={!isValid}
                  style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: '0 0 10px' }}
                >
                  <IonIcon icon={checkmarkOutline} slot="start" />
                  Guardar evaluación
                </IonButton>

                {/* Vista notificación */}
                <IonButton
                  expand="block"
                  fill="outline"
                  routerLink="/ciudadano/notificaciones"
                  style={{ '--color': '#006FB3', '--border-color': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                >
                  Vista notificación al ciudadano
                </IonButton>

              </div>
            </div>

          </div>
        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="bandeja" selected onClick={() => router.push('/funcionario/bandeja', 'back', 'pop')}>
            <IonIcon icon={briefcaseOutline} />
            <IonLabel>Bandeja</IonLabel>
          </IonTabButton>
          <IonTabButton tab="alertas" onClick={() => router.push('/funcionario/alertas', 'forward', 'push')}>
            <IonIcon icon={alertCircleOutline} />
            <IonLabel>Alertas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="finalizados">
            <IonIcon icon={checkboxOutline} />
            <IonLabel>Resueltos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF05Revision;