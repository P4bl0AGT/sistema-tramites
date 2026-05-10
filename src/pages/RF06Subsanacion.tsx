import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { cloudUploadOutline, documentTextOutline, warningOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import CiudadanoSidebar from '../components/CiudadanoSidebar';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';

const RF06Subsanacion: React.FC = () => {
  const [archivo, setArchivo] = useState<File | null>(null);

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent className="muni-ion-content">
        <main className="muni-content-area">
          <div className="muni-main-wrapper">
            <CiudadanoSidebar activePath="/ciudadano/subsanacion" />

            <div className="muni-main-column">
              <section className="muni-hero-card">
                <div className="muni-color-strip" />

                <div className="muni-hero-body muni-hero-body--row">
                  <div>
                    <p className="muni-kicker">RF-06 · Ciudadano</p>
                    <h2 className="muni-heading">Subsanación de documentos observados</h2>
                    <p className="muni-text">Corrige documentos pendientes para continuar con la revisión del expediente.</p>
                  </div>

                  <span className="muni-pill muni-pill--warn">
                    <IonIcon icon={warningOutline} />
                    Observación activa
                  </span>
                </div>
              </section>

              <div className="muni-banner muni-banner--danger">
                <IonIcon icon={warningOutline} />
                <p>
                  Documento observado: <strong>Cédula de identidad</strong>. La imagen enviada está borrosa y no permite validar el número de serie.
                </p>
              </div>

              <div className="muni-sub-grid">
                <section className="muni-panel-card">
                  <div className="muni-panel-header">Motivo de observación</div>

                  <div className="muni-panel-body">
                    <p>
                      El funcionario municipal solicita reemplazar la copia de la cédula por una imagen nítida por ambos lados.
                    </p>
                    <p>
                      <strong>Fecha observación:</strong> 06/05/2026
                    </p>
                    <p>
                      <strong>Unidad:</strong> Dirección de Rentas
                    </p>
                  </div>
                </section>

                <section className="muni-panel-card">
                  <div className="muni-panel-header">Subir documento corregido</div>

                  <div className="muni-form-card__body">
                    <div className="muni-form-group--large">
                      <label className="muni-form-label muni-form-label--large">
                        Nuevo archivo <span className="muni-required">*</span>
                      </label>

                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)}
                        className="muni-file-input"
                      />

                      <p className="muni-helper-text">Adjunta PDF, JPG o PNG. Verifica que el archivo sea legible antes de enviar.</p>
                    </div>

                    <IonButton expand="block" disabled={!archivo} routerLink="/ciudadano/trazabilidad" className="muni-btn-primary">
                      <IonIcon icon={cloudUploadOutline} slot="start" />
                      Enviar subsanación
                    </IonButton>
                  </div>
                </section>
              </div>

              <section className="muni-ticket-card">
                <p>Expediente asociado</p>
                <strong>SD-2026-001</strong>
                <span>
                  Estado esperado posterior al envío: <b>Revisión documental</b>
                </span>
              </section>

              <div className="muni-banner muni-banner--info">
                <IonIcon icon={documentTextOutline} />
                <p>Al enviar la subsanación, el trámite volverá automáticamente a la bandeja del funcionario asignado.</p>
              </div>
            </div>
          </div>
        </main>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default RF06Subsanacion;
