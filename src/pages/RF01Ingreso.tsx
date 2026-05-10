import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonRouter,
} from '@ionic/react';
import { addCircleOutline, documentTextOutline, informationCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import CiudadanoSidebar from '../components/CiudadanoSidebar';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';

const RF01Ingreso: React.FC = () => {
  const router = useIonRouter();

  const [tramiteData, setTramiteData] = useState({
    tipo: '',
    asunto: '',
    descripcion: '',
    archivo: null as File | null,
  });

  const isFormValid =
    tramiteData.tipo !== '' &&
    tramiteData.asunto.trim().length > 0 &&
    tramiteData.descripcion.trim().length >= 10 &&
    tramiteData.archivo !== null;

  const handleSend = () => router.push('/ciudadano/trazabilidad', 'forward', 'push');

  return (
    <IonPage>
      <PageHeader showLogout />

<<<<<<< Updated upstream
      <IonContent style={{ '--background': '#f5f7fa' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          {/* ── Sidebar card flotante ── */}
           <aside style={{
            flexShrink: 0, width: '200px', background: 'white',
            borderRadius: '10px', boxShadow: '0 8px 22px rgba(10,19,45,.10)',
            overflow: 'hidden', borderLeft: '5px solid #006FB3',
            position: 'sticky', top: '24px',
          }}>
            {/* Título */}
            <div style={{
              padding: '12px 14px 10px',
              fontWeight: 700,
              color: '#0A132D',
              fontSize: '.85rem',
              borderBottom: '1px solid #e8eef5',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <IonIcon icon={listOutline} style={{ fontSize: '15px', color: '#006FB3' }} />
              Ciudadano
            </div>
            {/* Links */}
            <nav style={{ padding: '6px 0' }}>
              {navLinks.map(({ label, href }) => {
                const isActive =
                  window.location.pathname === href ||
                  (href === '/ciudadano/ingreso' && window.location.pathname.endsWith('/ingreso'));
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
                      transition: 'background .15s',
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </nav>
          </aside>
=======
      <IonContent className="muni-ion-content">
        {/* Wrapper flex: sidebar + main */}
        <main className="muni-content-area">
          <div className="muni-main-wrapper">
            {/* ── Sidebar card flotante ── */}
            <CiudadanoSidebar activePath="/ciudadano/ingreso" />

            {/* ── Contenido principal ── */}
            <div className="muni-main-column">
              {/* Hero card */}
              <section className="muni-hero-card">
                <div className="muni-color-strip" />
>>>>>>> Stashed changes

                <div className="muni-hero-body muni-hero-body--row">
                  <div>
                    <p className="muni-kicker">RF-01 · Ciudadano</p>
                    <h2 className="muni-heading">Ingreso de trámite y expediente electrónico</h2>
                    <p className="muni-text">Inicia un trámite, adjunta documentación y genera un ticket único para trazabilidad.</p>
                  </div>

                  <span className="muni-pill muni-pill--info">
                    <IonIcon icon={documentTextOutline} />
                    Expediente digital
                  </span>
                </div>
              </section>

              {/* Form card */}
              <section className="muni-form-card">
                <div className="muni-form-card__header">Formulario de solicitud</div>

                <div className="muni-form-card__body">
                  {/* Tipo de trámite */}
                  <div className="muni-form-group--large">
                    <label className="muni-form-label muni-form-label--large">
                      Tipo de trámite <span className="muni-required">*</span>
                    </label>

                    <IonItem lines="full" className="muni-select-fill">
                      <IonSelect
                        placeholder="Selecciona una opción"
                        value={tramiteData.tipo}
                        onIonChange={(e) => setTramiteData({ ...tramiteData, tipo: e.detail.value })}
                      >
                        <IonSelectOption value="reclamo">Reclamo Municipal</IonSelectOption>
                        <IonSelectOption value="patente">Patente Comercial</IonSelectOption>
                        <IonSelectOption value="licencia">Licencia de Conducir (Sacar hora)</IonSelectOption>
                        <IonSelectOption value="subsidio">Subsidio Social</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </div>

                  {/* Asunto */}
                  <div className="muni-form-group--large">
                    <label className="muni-form-label muni-form-label--large">
                      Asunto <span className="muni-required">*</span>
                    </label>

                    <IonItem lines="full" className="muni-input">
                      <IonInput
                        placeholder="Ej: Solicitud de patente comercial"
                        value={tramiteData.asunto}
                        onIonInput={(e) => setTramiteData({ ...tramiteData, asunto: e.detail.value! })}
                      />
                    </IonItem>
                  </div>

                  {/* Descripción */}
                  <div className="muni-form-group--large">
                    <label className="muni-form-label muni-form-label--large">
                      Descripción del trámite <span className="muni-required">*</span>
                    </label>

                    <IonItem lines="full" className="muni-input">
                      <IonTextarea
                        placeholder="Describe la solicitud con lenguaje claro (mín. 10 caracteres)"
                        rows={5}
                        value={tramiteData.descripcion}
                        onIonInput={(e) => setTramiteData({ ...tramiteData, descripcion: e.detail.value! })}
                      />
                    </IonItem>
                  </div>

                  {/* File input */}
                  <div className="muni-form-group--large">
                    <label className="muni-form-label muni-form-label--large">
                      Adjuntar documentos <span className="muni-required">*</span>
                    </label>

                    <input
                      type="file"
                      onChange={(e) => setTramiteData({ ...tramiteData, archivo: e.target.files ? e.target.files[0] : null })}
                      className="muni-file-input"
                    />

                    <p className="muni-helper-text">Formatos sugeridos: PDF, JPG o PNG. Tamaño máximo por archivo: 10 MB.</p>
                  </div>

                  {/* Warning */}
                  <div className="muni-banner muni-banner--warn">
                    <IonIcon icon={informationCircleOutline} />
                    <p>Antes de enviar, revisa que los documentos estén legibles para evitar una observación posterior.</p>
                  </div>

                  {/* Botón */}
                  <IonButton expand="block" onClick={handleSend} disabled={!isFormValid} className="muni-btn-primary">
                    <IonIcon icon={addCircleOutline} slot="start" />
                    Enviar trámite
                  </IonButton>
                </div>
              </section>

              {/* Ticket */}
              <section className="muni-ticket-card">
                <p>Ticket asignado automáticamente</p>
                <strong>SD-2026-001</strong>
                <span>Guarda este número para trazabilidad.</span>
              </section>
            </div>
          </div>
        </main>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default RF01Ingreso;
