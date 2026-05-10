import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonItem, IonLabel, IonSelect, IonSelectOption, 
  IonTextarea, IonButton, IonIcon, IonFooter, 
  IonTabBar, IonTabButton, IonButtons, IonInput, useIonRouter
} from '@ionic/react';
import { addCircleOutline, listOutline, chatbubbleEllipsesOutline, logOutOutline, documentTextOutline, informationCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';

const navLinks = [
  { label: 'Iniciar trámite', href: '/ciudadano/ingreso' },
  { label: 'Trazabilidad',    href: '/ciudadano/trazabilidad' },
  { label: 'Subsanación',     href: '/ciudadano/subsanacion' },
  { label: 'Notificaciones',  href: '/ciudadano/notificaciones' },
];

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
  const handleLogout = () => { window.location.href = '/login'; };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#006FB3', '--color': 'white' }}>
          <IonTitle>Ingreso de Trámite</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#f5f7fa' }}>
        {/* Wrapper flex: sidebar + main */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '20px',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '24px 16px',
        }}>

          {/* ── Sidebar card flotante ── */}
          <aside style={{
            flexShrink: 0,
            width: '200px',
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 8px 22px rgba(10,19,45,.10)',
            overflow: 'hidden',
            borderLeft: '5px solid #006FB3',
            position: 'sticky',
            top: '24px',
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

          {/* ── Contenido principal ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Hero card */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 14px 35px rgba(10,19,45,.10)',
              overflow: 'hidden',
              marginBottom: '20px',
            }}>
              <div style={{ height: '6px', background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>
                      RF-01 · Ciudadano
                    </p>
                    <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>
                      Ingreso de trámite y expediente electrónico
                    </h2>
                    <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>
                      Inicia un trámite, adjunta documentación y genera un ticket único para trazabilidad.
                    </p>
                  </div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.35rem',
                    padding: '.35rem .65rem', borderRadius: '999px',
                    fontWeight: 700, fontSize: '.82rem',
                    background: '#e7f1fb', color: '#075d92',
                  }}>
                    <IonIcon icon={documentTextOutline} style={{ fontSize: '14px' }} />
                    Expediente digital
                  </span>
                </div>
              </div>
            </div>

            {/* Form card */}
            <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.95rem' }}>
                Formulario de solicitud
              </div>
              <div style={{ padding: '20px' }}>

                {/* Tipo de trámite */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.9rem' }}>
                    Tipo de trámite <span style={{ color: '#FE6565' }}>*</span>
                  </label>
                  <IonItem lines="full" style={{ '--background': '#EEEEEE', '--border-radius': '4px', '--padding-start': '10px' }}>
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
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.9rem' }}>
                    Asunto <span style={{ color: '#FE6565' }}>*</span>
                  </label>
                  <IonItem lines="full" style={{ '--background': 'white', '--border-color': '#cbd5e1', '--border-radius': '4px' }}>
                    <IonInput
                      placeholder="Ej: Solicitud de patente comercial"
                      value={tramiteData.asunto}
                      onIonInput={(e) => setTramiteData({ ...tramiteData, asunto: e.detail.value! })}
                    />
                  </IonItem>
                </div>

                {/* Descripción */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.9rem' }}>
                    Descripción del trámite <span style={{ color: '#FE6565' }}>*</span>
                  </label>
                  <IonItem lines="full" style={{ '--background': 'white', '--border-color': '#cbd5e1', '--border-radius': '4px' }}>
                    <IonTextarea
                      placeholder="Describe la solicitud con lenguaje claro (mín. 10 caracteres)"
                      rows={5}
                      value={tramiteData.descripcion}
                      onIonInput={(e) => setTramiteData({ ...tramiteData, descripcion: e.detail.value! })}
                    />
                  </IonItem>
                </div>

                {/* File input */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.9rem' }}>
                    Adjuntar documentos <span style={{ color: '#FE6565' }}>*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setTramiteData({ ...tramiteData, archivo: e.target.files ? e.target.files[0] : null })}
                    style={{ width: '100%', padding: '10px', background: '#EEEEEE', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  />
                  <p style={{ margin: '6px 0 0', fontSize: '.82rem', color: '#4A4A4A' }}>
                    Formatos sugeridos: PDF, JPG o PNG. Tamaño máximo por archivo: 10 MB.
                  </p>
                </div>

                {/* Warning */}
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  background: '#fff4e5', border: '1px solid #f6d08a',
                  borderRadius: '6px', padding: '12px 14px', marginBottom: '20px',
                }}>
                  <IonIcon icon={informationCircleOutline} style={{ fontSize: '18px', color: '#8a4b08', flexShrink: 0, marginTop: '1px' }} />
                  <p style={{ margin: 0, fontSize: '.88rem', color: '#8a4b08' }}>
                    Antes de enviar, revisa que los documentos estén legibles para evitar una observación posterior.
                  </p>
                </div>

                {/* Botón */}
                <IonButton
                  expand="block"
                  onClick={handleSend}
                  disabled={!isFormValid}
                  style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}
                >
                  <IonIcon icon={addCircleOutline} slot="start" />
                  Enviar trámite
                </IonButton>

              </div>
            </div>

            {/* Ticket */}
            <div style={{
              background: 'white', borderRadius: '10px',
              padding: '16px', borderLeft: '5px solid #006FB3',
              boxShadow: '0 6px 18px rgba(10,19,45,.06)',
              marginTop: '16px', marginBottom: '8px',
            }}>
              <p style={{ margin: '0 0 4px', fontSize: '.82rem', color: '#4A4A4A' }}>Ticket asignado automáticamente</p>
              <strong style={{ display: 'block', fontSize: '1.5rem', color: '#0A132D', fontWeight: 700 }}>SD-2026-001</strong>
              <span style={{ fontSize: '.82rem', color: '#4A4A4A' }}>Guarda este número para trazabilidad.</span>
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
          <IonTabButton tab="avisos" routerLink="/ciudadano/notificaciones">
            <IonIcon icon={chatbubbleEllipsesOutline} />
            <IonLabel>Avisos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF01Ingreso;