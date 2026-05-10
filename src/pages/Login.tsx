import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  useIonRouter,
} from '@ionic/react';
import { lockClosedOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';

type Tab = 'correo' | 'claveunica';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [activeTab, setActiveTab] = useState<Tab>('correo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isFormValid = isEmailValid && password.trim().length > 

  
0;

  const handleLogin = () => {
    if (email === 'admin' && password === 'admin') {
      router.push('/funcionario/bandeja', 'forward', 'push');
      return;
    }

    router.push('/ciudadano/ingreso', 'forward', 'push');
  };

  return (
    <IonPage>
      <PageHeader />

      <IonContent className="muni-ion-content">
        <main className="muni-content-area muni-container">
          <div className="muni-auth-wrapper">
            <section className="muni-info-card">
              <div className="muni-color-strip" />

              <div className="muni-info-body">
                <p className="muni-kicker">Acceso ciudadano y funcionario</p>
                <h2 className="muni-heading">Ingresa al Portal de Trámites</h2>

                <p className="muni-text">
                  Accede con correo y contraseña o con ClaveÚnica. Esta pantalla deja claro que
                  ClaveÚnica es una vía alternativa de autenticación, no el mismo formulario local.
                </p>

                <div className="muni-info-box">
                  <strong>Acceso funcionario</strong>
                  <span>
                    Para probar como funcionario usa el usuario <b>admin</b> y contraseña <b>admin</b>.
                  </span>
                </div>
              </div>
            </section>

<<<<<<< Updated upstream
              {/* Tab: Correo */}
              {activeTab === 'correo' && (
                <div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
                      Correo electrónico <span style={{ color: '#FE6565' }}>*</span>
                    </label>
                    <IonItem
                      lines="full"
                      style={{
                        '--background': 'white',
                        '--border-color': emailTouched && !isEmailValid ? '#FE6565' : '#cbd5e1',
                        '--border-radius': '4px'
                      }}
                    >
                      <IonInput
                        type="email"
                        placeholder="nombre@correo.cl"
                        value={email}
                        onIonInput={(e) => setEmail(e.detail.value!)}
                        onIonBlur={() => setEmailTouched(true)}
                      />
                    </IonItem>
                    {emailTouched && !isEmailValid && (
                      <p style={{ margin: '4px 0 0', fontSize: '.78rem', color: '#FE6565' }}>
                        Ingresa un correo válido (ej: nombre@correo.cl)
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
                        onIonInput={(e) => setPassword(e.detail.value!)}
                      />
                    </IonItem>
                  </div>

                  {/* Remember + recover */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IonCheckbox
                        checked={remember}
                        onIonChange={(e) => setRemember(e.detail.checked)}
                        style={{ flexShrink: 0 }}
                      />
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
=======
            <section className="muni-login-card">
              <div className="muni-color-strip" />

              <div className="muni-login-body">
                <div className="muni-tabs">
                  {(['correo', 'claveunica'] as Tab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`muni-tab-button ${activeTab === tab ? 'is-active' : ''}`}
                    >
                      {tab === 'correo' ? 'Correo y contraseña' : 'ClaveÚnica'}
                    </button>
                  ))}
>>>>>>> Stashed changes
                </div>

                {activeTab === 'correo' && (
                  <div>
                    <div className="muni-form-group">
                      <label className="muni-form-label">
                        Correo electrónico <span className="muni-required">*</span>
                      </label>

                      <IonItem lines="full" className="muni-input">
                        <IonInput
                          type="email"
                          placeholder="nombre@correo.cl"
                          value={email}
                          onIonInput={(e) => setEmail(e.detail.value!)}
                        />
                      </IonItem>
                    </div>

                    <div className="muni-form-group">
                      <label className="muni-form-label">
                        Contraseña <span className="muni-required">*</span>
                      </label>

                      <IonItem lines="full" className="muni-input">
                        <IonInput
                          type="password"
                          placeholder="Ingresa tu contraseña"
                          value={password}
                          onIonInput={(e) => setPassword(e.detail.value!)}
                        />
                      </IonItem>
                    </div>

                    <div className="muni-remember-row">
                      <IonItem lines="none" className="muni-checkbox-row">
                        <IonCheckbox
                          checked={remember}
                          onIonChange={(e) => setRemember(e.detail.checked)}
                          className="muni-checkbox"
                        />
                        <IonLabel className="muni-text-sm">Recordar sesión</IonLabel>
                      </IonItem>

                      <a href="#" className="muni-recover-link">
                        Recuperar contraseña
                      </a>
                    </div>

                    <IonButton
                      expand="block"
                      onClick={handleLogin}
                      disabled={!isFormValid}
                      className="muni-btn-primary"
                    >
                      <IonIcon icon={lockClosedOutline} slot="start" />
                      Iniciar sesión
                    </IonButton>
                  </div>
                )}

                {activeTab === 'claveunica' && (
                  <div className="muni-claveunica-box">
                    <div className="muni-claveunica-circle">CU</div>

                    <h3 className="muni-heading-sm">Autenticación con ClaveÚnica</h3>

                    <p className="muni-text-sm">
                      Usa la identidad digital del Estado para validar al ciudadano sin crear una
                      contraseña municipal adicional.
                    </p>

                    <br />

                    <IonButton
                      expand="block"
                      onClick={() => router.push('/ciudadano/ingreso', 'forward', 'push')}
                      className="muni-btn-dark"
                    >
                      Continuar con ClaveÚnica
                    </IonButton>

                    <p className="muni-claveunica-note">
                      En implementación real se redirige al proveedor OAuth de ClaveÚnica.
                    </p>
                  </div>
                )}

                <hr className="muni-divider" />

                <p className="muni-register-text">
                  ¿No tienes cuenta?{' '}
                  <a href="/registro" className="muni-register-link">
                    Regístrate aquí
                  </a>
                </p>
              </div>
            </section>
          </div>
        </main>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default Login;
