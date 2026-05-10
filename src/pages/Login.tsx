import { 
  IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel, 
  IonCheckbox, useIonRouter
} from '@ionic/react';
import { informationCircleOutline, lockClosedOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import React, { useState } from 'react';

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
    // admin/admin → funcionario; cualquier otro → ciudadano
    if (email === 'admin@gmail.com' && password === 'admin') {
      router.push('/funcionario/bandeja', 'forward', 'push');
    } else {
      router.push('/ciudadano/ingreso', 'forward', 'push');
    }
  };

  return (
    <IonPage>
      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'stretch' }}>

          {/* ── Left: info card ── */}
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
                Accede con correo y contraseña o con ClaveÚnica. Esta pantalla deja claro que ClaveÚnica es una vía alternativa de autenticación, no el mismo formulario local.
              </p>

    
            </div>
          </div>

          {/* ── Right: login card with tabs ── */}
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 14px 35px rgba(10,19,45,.10)', overflow: 'hidden' }}>
            <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
            <div style={{ padding: '28px 24px' }}>

              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '20px' }}>
                {(['correo', 'claveunica'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '.55rem 1rem',
                      fontSize: '.88rem', fontWeight: 700,
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
                </div>
              )}

              {/* Tab: ClaveÚnica */}
              {activeTab === 'claveunica' && (
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: '#0A132D', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px', fontSize: '1.4rem', fontWeight: 700
                  }}>
                    CU
                  </div>
                  <h3 style={{ margin: '0 0 8px', color: '#0A132D', fontWeight: 700, fontSize: '1rem' }}>
                    Autenticación con ClaveÚnica
                  </h3>
                  <p style={{ margin: '0 0 20px', color: '#4A4A4A', fontSize: '.88rem', lineHeight: 1.5 }}>
                    Usa la identidad digital del Estado para validar al ciudadano sin crear una contraseña municipal adicional.
                  </p>
                  <IonButton
                    expand="block"
                    onClick={() => router.push('/ciudadano/ingreso', 'forward', 'push')}
                    style={{
                      '--background': '#0A132D', '--border-radius': '4px',
                      fontWeight: 700, margin: '0 0 12px'
                    }}
                  >
                    Continuar con ClaveÚnica
                  </IonButton>
                  <p style={{ margin: 0, fontSize: '.78rem', color: '#8A8A8A' }}>
                    En implementación real se redirige al proveedor OAuth de ClaveÚnica.
                  </p>
                </div>
              )}

              {/* Divider + register */}
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
      </IonContent>
    </IonPage>
  );
};

export default Login;