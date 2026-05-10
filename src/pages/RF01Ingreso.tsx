import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonItem, IonLabel, IonSelect, IonSelectOption, 
  IonTextarea, IonButton, IonIcon, IonFooter, 
  IonTabBar, IonTabButton, IonButtons, IonInput, useIonRouter
} from '@ionic/react';
import { addCircleOutline, listOutline, chatbubbleEllipsesOutline, logOutOutline, documentTextOutline, informationCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';

const RF01Ingreso: React.FC = () => {
  const router = useIonRouter();
  
  const [tramiteData, setTramiteData] = useState({
    tipo: '',
    asunto: '',
    descripcion: '',
    archivo: null as File | null
  });

  const isFormValid = 
    tramiteData.tipo !== '' && 
    tramiteData.asunto.trim().length > 0 &&
    tramiteData.descripcion.trim().length >= 10 && 
    tramiteData.archivo !== null;

  const handleSend = () => {
    router.push('/ciudadano/trazabilidad', 'forward', 'push');
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--gob-primary)', '--color': 'white' }}>
          <IonTitle>Ingreso de Trámite</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#f5f7fa' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>

          {/* Hero card — RF-01 header */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 14px 35px rgba(10,19,45,.10)',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            {/* Ribbon tricolor */}
            <div style={{
              height: '6px',
              background: 'linear-gradient(90deg, var(--gob-primary) 0 45%, var(--gob-secondary,#FE6565) 45% 70%, var(--gob-green) 70%)'
            }} />
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: 'var(--gob-primary)', fontWeight: 700, margin: '0 0 6px' }}>
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
                  background: '#e7f1fb', color: '#075d92'
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
                    onIonChange={(e) => setTramiteData({...tramiteData, tipo: e.detail.value})}
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
                    onIonInput={(e) => setTramiteData({...tramiteData, asunto: e.detail.value!})}
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
                    onIonInput={(e) => setTramiteData({...tramiteData, descripcion: e.detail.value!})}
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
                  onChange={(e) => setTramiteData({...tramiteData, archivo: e.target.files ? e.target.files[0] : null})}
                  style={{ width: '100%', padding: '10px', background: '#EEEEEE', borderRadius: '4px', border: '1px solid #cbd5e1' }} 
                />
                <p style={{ margin: '6px 0 0', fontSize: '.82rem', color: '#4A4A4A' }}>
                  Formatos sugeridos: PDF, JPG o PNG. Tamaño máximo por archivo: 10 MB.
                </p>
              </div>

              {/* Warning alert */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                background: '#fff4e5', border: '1px solid #f6d08a',
                borderRadius: '6px', padding: '12px 14px', marginBottom: '20px'
              }}>
                <IonIcon icon={informationCircleOutline} style={{ fontSize: '18px', color: '#8a4b08', flexShrink: 0, marginTop: '1px' }} />
                <p style={{ margin: 0, fontSize: '.88rem', color: '#8a4b08' }}>
                  Antes de enviar, revisa que los documentos estén legibles para evitar una observación posterior.
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <IonButton 
                  onClick={handleSend}
                  disabled={!isFormValid}
                  style={{ '--background': 'var(--gob-primary)', '--border-radius': '4px', fontWeight: 700, flex: '1 1 160px' }}
                >
                  <IonIcon icon={addCircleOutline} slot="start" />
                  Enviar trámite
                </IonButton>
                <IonButton 
                  fill="outline"
                  onClick={() => router.push('/ciudadano/trazabilidad', 'forward', 'push')}
                  style={{ '--color': 'var(--gob-primary)', '--border-color': 'var(--gob-primary)', '--border-radius': '4px', flex: '1 1 160px' }}
                >
                  Ver estado demo
                </IonButton>
              </div>

            </div>
          </div>

          {/* Metric ticket */}
          <div style={{
            background: 'white', borderRadius: '10px',
            padding: '16px', borderLeft: '5px solid var(--gob-primary)',
            boxShadow: '0 6px 18px rgba(10,19,45,.06)',
            marginTop: '16px', marginBottom: '8px'
          }}>
            <p style={{ margin: '0 0 4px', fontSize: '.82rem', color: '#4A4A4A' }}>Ticket asignado automáticamente</p>
            <strong style={{ display: 'block', fontSize: '1.5rem', color: '#0A132D', fontWeight: 700 }}>SD-2026-001</strong>
            <span style={{ fontSize: '.82rem', color: '#4A4A4A' }}>Guarda este número para trazabilidad.</span>
          </div>

        </div>
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