import {
  IonContent, IonPage, IonButton, IonInput, IonItem,
  IonCheckbox, IonIcon, useIonRouter,
} from '@ionic/react';
import { lockClosedOutline, alertCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import { authService } from '../../services/auth.service';

type Tab = 'correo' | 'claveunica';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [activeTab, setActiveTab]   = useState<Tab>('correo');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [remember, setRemember]     = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const emailRegex  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isFormValid  = isEmailValid && password.trim().length > 0;

  const handleLogin = () => {
    const role = authService.login(email, password);
    if (role === null) {
      setLoginError(true);
      return;
    }
    setLoginError(false);
    router.push(
      role === 'funcionario' ? '/funcionario/bandeja' : '/ciudadano/ingreso',
      'forward', 'push',
    );
  };

  return (
    <IonPage>
      <PageHeader />

      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{
          maxWidth: '800px', margin: '0 auto', padding: '32px 16px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'stretch',
        }}>

          {/* ── Izquierda: info ── */}
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
            <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 8px' }}>
                Acceso ciudadano y funcionario
              </p>
              <h2 style={{ margin: '0 0 12px', color: '#0A132D', fontWeight: 700, fontSize: '1.25rem' }}>
                Ingresa al Portal de Trámites
              </h2>
              <p style={{ margin: '0 0 20px', color: '#4A4A4A', fontSize: '.92rem', lineHeight: 1.5 }}>
                Accede con correo y contraseña o con ClaveÚnica. Funcionario: <strong>admin@gmail.com</strong> / <strong>admin</strong>.
              </p>
            </div>
          </div>

          {/* ── Derecha: formulario ── */}
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden' }}>
            <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
            <div style={{ padding: '28px 24px' }}>

              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '20px' }}>
                {(['correo', 'claveunica'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setLoginError(false); }}
                    style={{
                      padding: '.55rem 1rem', fontSize: '.88rem', fontWeight: 700,
                      border: 'none', background: 'none', cursor: 'pointer',
                      color: activeTab === tab ? '#006FB3' : '#8A8A8A',
                      borderBottom: activeTab === tab ? '2px solid #006FB3' : '2px solid transparent',
                      marginBottom: '-2px',
                    }}
                  >
                    {tab === 'correo' ? 'Correo y contraseña' : 'ClaveÚnica'}
                  </button>
                ))}
              </div>

              {/* Tab: Correo */}
              {activeTab === 'correo' && (
                <div>
                  {/* Error de credenciales */}
                  {loginError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffe9e9', border: '1px solid #f5b8b8', borderRadius: '6px', padding: '10px 14px', marginBottom: '14px' }}>
                      <IonIcon icon={alertCircleOutline} style={{ color: '#8b1f1f', fontSize: '18px', flexShrink: 0 }} />
                      <span style={{ fontSize: '.86rem', color: '#8b1f1f' }}>Correo o contraseña incorrectos.</span>
                    </div>
                  )}

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                      Correo electrónico <span style={{ color: '#FE6565' }}>*</span>
                    </label>
                    <IonItem lines="full" style={{ '--background': 'white', '--border-color': emailTouched && !isEmailValid ? '#FE6565' : '#cbd5e1', '--border-radius': '4px' }}>
                      <IonInput
                        type="email"
                        placeholder="nombre@correo.cl"
                        value={email}
                        onIonInput={(e) => { setEmail(e.detail.value!); setLoginError(false); }}
                        onIonBlur={() => setEmailTouched(true)}
                      />
                    </IonItem>
                    {emailTouched && !isEmailValid && (
                      <p style={{ margin: '4px 0 0', fontSize: '.78rem', color: '#FE6565' }}>
                        Ingresa un correo válido.
                      </p>
                    )}
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                      Contraseña <span style={{ color: '#FE6565' }}>*</span>
                    </label>
                    <IonItem lines="full" style={{ '--background': 'white', '--border-color': '#cbd5e1', '--border-radius': '4px' }}>
                      <IonInput
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onIonInput={(e) => { setPassword(e.detail.value!); setLoginError(false); }}
                      />
                    </IonItem>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IonCheckbox checked={remember} onIonChange={(e) => setRemember(e.detail.checked)} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '.86rem', color: '#4A4A4A' }}>Recordar sesión</span>
                    </div>
                    <a href="#" style={{ fontSize: '.82rem', color: '#006FB3', textDecoration: 'none' }}>
                      Recuperar contraseña
                    </a>
                  </div>

                  <IonButton
                    expand="block"
                    onClick={handleLogin}
                    disabled={!isFormValid}
                    style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                  >
                    <IonIcon icon={lockClosedOutline} slot="start" />
                    Iniciar sesión
                  </IonButton>
                </div>
              )}

              {/* Tab: ClaveÚnica */}
              {activeTab === 'claveunica' && (
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#0A132D', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.4rem', fontWeight: 700 }}>
                    CU
                  </div>
                  <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700, fontSize: '1rem' }}>
                    Autenticación con ClaveÚnica
                  </h3>
                  <p style={{ margin: '0 0 20px', color: '#4A4A4A', fontSize: '.88rem', lineHeight: 1.5 }}>
                    Usa la identidad digital del Estado para validar al ciudadano sin contraseña municipal.
                  </p>
                  <IonButton
                    expand="block"
                    onClick={() => {
                      authService.loginClaveUnica();
                      router.push('/ciudadano/ingreso', 'forward', 'push');
                    }}
                    style={{ '--background': '#0A132D', '--border-radius': '4px', fontWeight: 700, margin: '0 0 12px' }}
                  >
                    Continuar con ClaveÚnica
                  </IonButton>
                  <p style={{ margin: 0, fontSize: '.78rem', color: '#8A8A8A' }}>
                    En producción se redirige al proveedor OAuth de ClaveÚnica.
                  </p>
                </div>
              )}

              <hr style={{ margin: '20px 0', borderColor: '#e2e8f0' }} />
              <p style={{ textAlign: 'center', margin: 0, fontSize: '.88rem', color: '#4A4A4A' }}>
                ¿No tienes cuenta?{' '}
                <a href="/registro" style={{ color: '#006FB3', textDecoration: 'none', fontWeight: 700 }}>
                  Regístrate aquí
                </a>
              </p>

            </div>
          </div>
        </div>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default Login;
