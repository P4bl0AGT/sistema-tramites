import { IonButton, IonContent, IonIcon, IonItem, IonPage, IonSelect, IonSelectOption, IonTextarea, useIonRouter } from '@ionic/react';
import {
  alertCircleOutline,
  briefcaseOutline,
  checkmarkOutline,
  documentTextOutline,
  downloadOutline,
  imageOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';
import FuncionarioSidebar from '../components/FuncionarioSidebar';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';

interface DocRow {
  nombre: string;
  icono: string;
  accion: 'ver' | 'descargar' | 'ilegible';
}

const documentos: DocRow[] = [
  { nombre: 'Formulario de solicitud.pdf', icono: 'documentText', accion: 'ver' },
  { nombre: 'Cédula identidad.jpg', icono: 'image', accion: 'ilegible' },
  { nombre: 'Inicio actividades.pdf', icono: 'documentText', accion: 'ver' },
  { nombre: 'Plano local.pdf', icono: 'download', accion: 'descargar' },
];

const iconMap: Record<string, string> = {
  documentText: documentTextOutline,
  image: imageOutline,
  download: downloadOutline,
};

const RF05Revision: React.FC = () => {
  const router = useIonRouter();

  const [estadoRevision, setEstadoRevision] = useState('observar');
  const [observacion, setObservacion] = useState(
    'La copia de la cédula de identidad está ilegible. Debe subir una imagen nítida por ambos lados.'
  );

  const handleGuardar = () => {
    router.push('/funcionario/bandeja', 'back', 'pop');
  };

  const isValid = estadoRevision !== '' && (estadoRevision === 'aprobar' || observacion.trim().length >= 5);

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent className="muni-ion-content">
        <main className="muni-content-area">
          <div className="muni-main-wrapper">
            <FuncionarioSidebar activePath="/funcionario/revision" />

            <div className="muni-main-column">
              <section className="muni-hero-card">
                <div className="muni-color-strip" />

                <div className="muni-hero-body muni-hero-body--row">
                  <div>
                    <p className="muni-kicker">RF-05 · Funcionario</p>

                    <h2 className="muni-heading">Revisión, observación y cambio de estado</h2>

                    <p className="muni-text">
                      Evalúa documentos, cambia estado y registra motivo explícito para aprobación, rechazo u observación.
                    </p>
                  </div>

                  <IonButton fill="outline" routerLink="/funcionario/bandeja" className="muni-btn-outline-primary">
                    <IonIcon icon={briefcaseOutline} slot="start" />
                    Volver a bandeja
                  </IonButton>
                </div>
              </section>

              <div className="muni-review-grid">
                <section className="muni-panel-card">
                  <div className="muni-panel-header">Expediente SD-2026-041</div>

                  <div className="muni-document-list">
                    {documentos.map((doc, i) => (
                      <div key={i} className="muni-document-row">
                        <div className="muni-document-info">
                          <IonIcon icon={iconMap[doc.icono]} className="muni-document-icon" />
                          <span className="muni-document-name">{doc.nombre}</span>
                        </div>

                        {doc.accion === 'ilegible' ? (
                          <span className="muni-pill muni-pill--danger muni-pill--xs">Ilegible</span>
                        ) : (
                          <IonButton fill="outline" size="small" className="muni-btn-outline-primary-small">
                            {doc.accion === 'ver' ? 'Ver' : 'Descargar'}
                          </IonButton>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="muni-panel-card">
                  <div className="muni-panel-header">Evaluación</div>

                  <div className="muni-review-form-body">
                    <div className="muni-form-group">
                      <label className="muni-form-label">
                        Cambiar estado <span className="muni-required">*</span>
                      </label>

                      <IonItem lines="full" className="muni-select-fill">
                        <IonSelect value={estadoRevision} onIonChange={(e) => setEstadoRevision(e.detail.value)}>
                          <IonSelectOption value="aprobar">Aprobar</IonSelectOption>
                          <IonSelectOption value="rechazar">Rechazar</IonSelectOption>
                          <IonSelectOption value="observar">Observar</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    </div>

                    <div className="muni-form-group">
                      <label className="muni-form-label">
                        Motivo explícito <span className="muni-required">*</span>
                      </label>

                      <IonItem lines="full" className="muni-input">
                        <IonTextarea rows={6} value={observacion} onIonInput={(e) => setObservacion(e.detail.value!)} />
                      </IonItem>
                    </div>

                    <IonButton expand="block" onClick={handleGuardar} disabled={!isValid} className="muni-btn-primary">
                      <IonIcon icon={checkmarkOutline} slot="start" />
                      Guardar evaluación
                    </IonButton>

                    <IonButton expand="block" fill="outline" routerLink="/funcionario/alertas" className="muni-btn-outline-danger">
                      <IonIcon icon={alertCircleOutline} slot="start" />
                      Ver alertas
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

export default RF05Revision;
