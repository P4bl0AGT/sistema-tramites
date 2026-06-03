import {
  IonContent, IonPage,
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton,
  IonLabel, useIonRouter, useIonViewWillEnter
} from '@ionic/react';
import {
  briefcaseOutline, alertCircleOutline, checkboxOutline
} from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import FuncionarioSidebar from '../../components/FuncionarioSidebar';
import {
  tramitesService, Tramite, pillStyles, borderColors,
} from '../../services/tramites.service';

const RF03Bandeja: React.FC = () => {
  const router = useIonRouter();
  const [tramites, setTramites] = useState<Tramite[]>([]);

  useIonViewWillEnter(() => {
    void (async () => { setTramites(await tramitesService.getAll()); })();
  });

  const activos   = tramites.filter(t => t.estado !== 'aprobado' && t.estado !== 'rechazado');
  const urgentes  = tramites.filter(t => t.diasRestantes <= 3 && t.estado !== 'aprobado' && t.estado !== 'rechazado');
  const resueltos = tramites.filter(t => t.estado === 'aprobado' || t.estado === 'rechazado');

  const handleRevisar = (id: string) => {
    tramitesService.setSelected(id);
    router.push('/funcionario/revision', 'forward', 'push');
  };

  return (
    <IonPage>
      <PageHeader showLogout />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

          <FuncionarioSidebar activePath="/funcionario/bandeja" />

          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Ventana */}
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
              <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>RF-03 · Funcionario</p>
                  <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>Bandeja de gestión y control de plazos</h2>
                  <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>Panel con solicitudes asignadas, documentos, fecha de ingreso y días hábiles restantes.</p>
                </div>
                <IonButton fill="outline" routerLink="/funcionario/alertas"
                  style={{ '--color': '#FE6565', '--border-color': '#FE6565', '--border-radius': '4px', fontWeight: 700, flexShrink: 0 }}>
                  <IonIcon icon={alertCircleOutline} slot="start" />
                  Ver alertas ({urgentes.length})
                </IonButton>
              </div>
            </div>

            {/* Métricas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { value: activos.length,   label: 'Solicitudes activas',    borderColor: '#006FB3' },
                { value: urgentes.length,  label: 'Próximas a vencer',      borderColor: '#E0701E' },
                { value: resueltos.length, label: 'Resueltas',              borderColor: '#2D717C' },
              ].map((m, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '10px', padding: '14px 16px', borderLeft: `5px solid ${m.borderColor}`, boxShadow: '0 6px 18px rgba(10,19,45,.06)', minHeight: '90px' }}>
                  <strong style={{ display: 'block', fontSize: '1.8rem', color: '#0A132D', fontWeight: 700, lineHeight: 1.1 }}>{m.value}</strong>
                  <span style={{ fontSize: '.82rem', color: '#4A4A4A' }}>{m.label}</span>
                </div>
              ))}
            </div>

            {/* Sin trámites */}
            {tramites.length === 0 && (
              <div style={{ background: 'white', borderRadius: '10px', padding: '40px', textAlign: 'center', boxShadow: '0 6px 18px rgba(10,19,45,.08)' }}>
                <IonIcon icon={briefcaseOutline} style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '12px' }} />
                <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700 }}>Sin trámites en la bandeja</h3>
                <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>Los trámites creados por los ciudadanos aparecerán aquí.</p>
              </div>
            )}

            {/* Cards de trámites activos */}
            {activos.length > 0 && (
              <>
                <p style={{ margin: '0 0 12px', fontSize: '.88rem', fontWeight: 700, color: '#0A132D' }}>Solicitudes activas</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  {activos.map((t) => {
                    const ps = tramitesService.getPillStatus(t.diasRestantes);
                    return (
                      <div key={t.id} style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '10px 14px', borderBottom: '1px solid #e8eef5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                          <span>{t.ticket}</span>
                          <span style={{ ...pillStyles[ps], padding: '.28rem .6rem', borderRadius: '999px', fontWeight: 700, fontSize: '.78rem' }}>
                            {t.diasRestantes} día{t.diasRestantes !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div style={{ padding: '14px', fontSize: '.86rem', color: '#4A4A4A', flex: 1 }}>
                          <p style={{ margin: '0 0 4px' }}><strong>Tipo:</strong> {tramitesService.getTipoLabel(t.tipo)}</p>
                          <p style={{ margin: '0 0 4px' }}><strong>Ciudadano:</strong> {t.ciudadanoNombre}</p>
                          <p style={{ margin: '0 0 4px' }}><strong>Ingreso:</strong> {t.fechaIngreso}</p>
                          <p style={{ margin: '0 0 14px' }}><strong>Estado:</strong> {t.estado.replace('_', ' ')}</p>
                          <IonButton size="small" onClick={() => handleRevisar(t.id)}
                            style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}>
                            Revisar
                          </IonButton>
                        </div>
                        <div style={{ height: 4, background: borderColors[ps] }} />
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Resueltos */}
            {resueltos.length > 0 && (
              <>
                <p style={{ margin: '0 0 12px', fontSize: '.88rem', fontWeight: 700, color: '#0A132D' }}>Resueltos</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '16px' }}>
                  {resueltos.map((t) => (
                    <div key={t.id} style={{ background: 'white', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,19,45,.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', opacity: 0.7 }}>
                      <div style={{ padding: '10px 14px', borderBottom: '1px solid #e8eef5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, color: '#0A132D', fontSize: '.88rem' }}>
                        <span>{t.ticket}</span>
                        <span style={{ background: t.estado === 'aprobado' ? '#e8f5f2' : '#ffe9e9', color: t.estado === 'aprobado' ? '#1d5d64' : '#8b1f1f', padding: '.28rem .6rem', borderRadius: '999px', fontWeight: 700, fontSize: '.78rem' }}>
                          {t.estado === 'aprobado' ? 'Aprobado' : 'Rechazado'}
                        </span>
                      </div>
                      <div style={{ padding: '14px', fontSize: '.86rem', color: '#4A4A4A' }}>
                        <p style={{ margin: '0 0 4px' }}><strong>Tipo:</strong> {tramitesService.getTipoLabel(t.tipo)}</p>
                        <p style={{ margin: 0 }}><strong>Ciudadano:</strong> {t.ciudadanoNombre}</p>
                      </div>
                      <div style={{ height: 4, background: t.estado === 'aprobado' ? '#2D717C' : '#FE6565' }} />
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>

        <PageFooter />
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonTabBar slot="bottom" style={{ borderTop: '1px solid #ddd' }}>
          <IonTabButton tab="bandeja" selected style={{ '--color-selected': '#0A132D' }}><IonIcon icon={briefcaseOutline} /><IonLabel>Bandeja</IonLabel></IonTabButton>
          <IonTabButton tab="alertas" onClick={() => router.push('/funcionario/alertas', 'forward', 'push')}><IonIcon icon={alertCircleOutline} /><IonLabel>Alertas</IonLabel></IonTabButton>
          <IonTabButton tab="finalizados"><IonIcon icon={checkboxOutline} /><IonLabel>Resueltos</IonLabel></IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RF03Bandeja;
