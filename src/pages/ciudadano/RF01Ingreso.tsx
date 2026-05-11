import {
  IonContent, IonPage,
  IonItem, IonSelect, IonSelectOption,
  IonTextarea, IonButton, IonIcon, IonFooter,
  IonTabBar, IonTabButton, IonInput, IonLabel, useIonRouter
} from '@ionic/react';
import {
  addCircleOutline, listOutline, chatbubbleEllipsesOutline,
  documentTextOutline, informationCircleOutline, checkmarkCircleOutline
} from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import CiudadanoSidebar from '../../components/CiudadanoSidebar';
import { authService } from '../../services/auth.service';
import { tramitesService } from '../../services/tramites.service';

const RF01Ingreso: React.FC = () => {
  const router = useIonRouter();

  const [tramiteData, setTramiteData] = useState({
    tipo: '', asunto: '', descripcion: '',
    archivo: null as File | null,
  });
  const [ticketGenerado, setTicketGenerado] = useState('');
  const [enviado, setEnviado] = useState(false);

  const isFormValid =
    tramiteData.tipo !== '' &&
    tramiteData.asunto.trim().length > 0 &&
    tramiteData.descripcion.trim().length >= 10 &&
    tramiteData.archivo !== null;

  const handleSend = () => {
    const user = authService.getCurrentUser();
    if (!user) { router.push('/login', 'root', 'replace'); return; }

    const tramite = tramitesService.create({
      tipo:            tramiteData.tipo,
      asunto:          tramiteData.asunto,
      descripcion:     tramiteData.descripcion,
      archivoNombre:   tramiteData.archivo?.name,
      ciudadanoId:     user.id,
      ciudadanoNombre: user.nombre,
      ciudadanoEmail:  user.correo,
    });

    setTicketGenerado(tramite.id);
    setEnviado(true);
  };

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          <CiudadanoSidebar activePath="/ciudadano/ingreso" />

          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Ventana */}
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: '6px', background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>RF-01 · Ciudadano</p>
                    <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>Ingreso de trámite y expediente electrónico</h2>
                    <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>Inicia un trámite, adjunta documentación y genera un ticket único para trazabilidad.</p>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', padding: '.35rem .65rem', borderRadius: '999px', fontWeight: 700, fontSize: '.82rem', background: '#e7f1fb', color: '#075d92' }}>
                    <IonIcon icon={documentTextOutline} style={{ fontSize: '14px' }} />
                    Expediente digital
                  </span>
                </div>
              </div>
            </div>

            {/* Formulario */}
            {!enviado ? (
              <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid #e8eef5', fontWeight: 700, color: '#0A132D', fontSize: '.95rem' }}>
                  Formulario de solicitud
                </div>

                <div style={{ padding: '20px' }}>
                  {/* Tipo */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.9rem' }}>
                      Tipo de trámite <span style={{ color: '#FE6565' }}>*</span>
                    </label>
                    <IonItem lines="full" style={{ '--background': '#EEEEEE', '--border-radius': '4px', '--padding-start': '10px' }}>
                      <IonSelect placeholder="Selecciona una opción" value={tramiteData.tipo}
                        onIonChange={(e) => setTramiteData(p => ({ ...p, tipo: e.detail.value }))}>
                        <IonSelectOption value="reclamo">Reclamo Municipal</IonSelectOption>
                        <IonSelectOption value="patente">Patente Comercial</IonSelectOption>
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
                      <IonInput placeholder="Ej: Solicitud de patente comercial" value={tramiteData.asunto}
                        onIonInput={(e) => setTramiteData(p => ({ ...p, asunto: e.detail.value! }))} />
                    </IonItem>
                  </div>

                  {/* Descripción */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.9rem' }}>
                      Descripción del trámite <span style={{ color: '#FE6565' }}>*</span>
                    </label>
                    <IonItem lines="full" style={{ '--background': 'white', '--border-color': '#cbd5e1', '--border-radius': '4px' }}>
                      <IonTextarea placeholder="Describe la solicitud con lenguaje claro (mín. 10 caracteres)" rows={5}
                        value={tramiteData.descripcion}
                        onIonInput={(e) => setTramiteData(p => ({ ...p, descripcion: e.detail.value! }))} />
                    </IonItem>
                  </div>

                  {/* Archivo */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.9rem' }}>
                      Adjuntar documentos <span style={{ color: '#FE6565' }}>*</span>
                    </label>
                    <input type="file"
                      onChange={(e) => setTramiteData(p => ({ ...p, archivo: e.target.files ? e.target.files[0] : null }))}
                      style={{ width: '100%', padding: '10px', background: '#EEEEEE', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                    <p style={{ margin: '6px 0 0', fontSize: '.82rem', color: '#4A4A4A' }}>
                      Formatos sugeridos: PDF, JPG o PNG. Tamaño máximo: 10 MB.
                    </p>
                    {tramiteData.archivo && (
                      <p style={{ margin: '4px 0 0', fontSize: '.82rem', color: '#2D717C' }}>✓ {tramiteData.archivo.name}</p>
                    )}
                  </div>

                  {/* Aviso */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#fff4e5', border: '1px solid #f6d08a', borderRadius: '6px', padding: '12px 14px', marginBottom: '20px' }}>
                    <IonIcon icon={informationCircleOutline} style={{ fontSize: '18px', color: '#8a4b08', flexShrink: 0, marginTop: '1px' }} />
                    <p style={{ margin: 0, fontSize: '.88rem', color: '#8a4b08' }}>
                      Antes de enviar, revisa que los documentos estén legibles para evitar una observación posterior.
                    </p>
                  </div>

                  <IonButton expand="block" onClick={handleSend} disabled={!isFormValid}
                    style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}>
                    <IonIcon icon={addCircleOutline} slot="start" />
                    Enviar trámite
                  </IonButton>
                </div>
              </div>
            ) : (
              /* ── Confirmación con ticket real ── */
              <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden' }}>
                <div style={{ height: 4, background: '#2D717C' }} />
                <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                  <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '52px', color: '#2D717C', marginBottom: '12px' }} />
                  <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700, fontSize: '1.1rem' }}>
                    ¡Trámite enviado con éxito!
                  </h3>
                  <p style={{ margin: '0 0 20px', color: '#4A4A4A', fontSize: '.92rem' }}>
                    Tu solicitud fue ingresada y recepcionada por la oficina de partes.
                  </p>

                  <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '16px 24px', display: 'inline-block', marginBottom: '24px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '.82rem', color: '#4A4A4A' }}>Ticket asignado</p>
                    <strong style={{ display: 'block', fontSize: '2rem', color: '#0A132D', fontWeight: 700 }}>
                      {ticketGenerado}
                    </strong>
                    <span style={{ fontSize: '.82rem', color: '#4A4A4A' }}>Guarda este número para trazabilidad.</span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <IonButton onClick={() => router.push('/ciudadano/trazabilidad', 'forward', 'push')}
                      style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}>
                      <IonIcon icon={listOutline} slot="start" />
                      Ver trazabilidad
                    </IonButton>
                    <IonButton fill="outline" onClick={() => {
                      setEnviado(false);
                      setTramiteData({ tipo: '', asunto: '', descripcion: '', archivo: null });
                      setTicketGenerado('');
                    }} style={{ '--color': '#006FB3', '--border-color': '#006FB3', '--border-radius': '4px', fontWeight: 700 }}>
                      Ingresar otro trámite
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
          <IonTabButton tab="tramite" routerLink="/ciudadano/ingreso">
            <IonIcon icon={addCircleOutline} /><IonLabel>Trámite</IonLabel>
          </IonTabButton>
          <IonTabButton tab="estado" routerLink="/ciudadano/trazabilidad">
            <IonIcon icon={listOutline} /><IonLabel>Estado</IonLabel>
          </IonTabButton>
          <IonTabButton tab="avisos" routerLink="/ciudadano/notificaciones">
            <IonIcon icon={chatbubbleEllipsesOutline} /><IonLabel>Avisos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF01Ingreso;
