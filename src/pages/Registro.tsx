import { 
  IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonCheckbox, IonIcon
} from '@ionic/react';
import { checkmarkOutline } from 'ionicons/icons';
import React, { useState, useMemo } from 'react';

// ── Data ──────────────────────────────────────────────────────────────────────
const REGIONES_CHILE = [
  { nombre: "Arica y Parinacota",    comunas: ["Arica", "Camarones", "Putre"] },
  { nombre: "Región de Valparaíso",  comunas: ["Santo Domingo", "San Antonio", "El Tabo", "Cartagena", "Valparaíso", "Viña del Mar"] },
  { nombre: "Región Metropolitana",  comunas: ["Santiago", "Providencia", "Maipú", "Las Condes"] },
  { nombre: "Región de O'Higgins",   comunas: ["Rancagua", "San Fernando", "Pichilemu"] },
];

// ── Helper: labeled input field ───────────────────────────────────────────────
const Field: React.FC<{
  label: string;
  required?: boolean;
  helper?: string;
  children: React.ReactNode;
}> = ({ label, required, helper, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <label style={{ display: 'block', fontWeight: 700, color: '#263142', marginBottom: '6px', fontSize: '.88rem' }}>
      {label}{required && <span style={{ color: '#FE6565' }}> *</span>}
    </label>
    {children}
    {helper && <p style={{ margin: '4px 0 0', fontSize: '.78rem', color: '#8A8A8A' }}>{helper}</p>}
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────
const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '', rut: '', correo: '', telefono: '',
    region: '', comuna: '',
    pass: '', confirmPass: '', terminos: false
  });

  const set = (key: keyof typeof formData) => (val: any) =>
    setFormData(prev => ({ ...prev, [key]: val }));

  const comunasDisponibles = useMemo(() => {
    const r = REGIONES_CHILE.find(r => r.nombre === formData.region);
    return r ? r.comunas : [];
  }, [formData.region]);

  const isFormValid =
    formData.nombre.trim() !== '' &&
    formData.rut.trim() !== '' &&
    formData.correo.includes('@') &&
    formData.region !== '' &&
    formData.comuna !== '' &&
    formData.pass.length >= 8 &&
    formData.pass === formData.confirmPass &&
    formData.terminos;

  const itemStyle = { '--background': 'white', '--border-color': '#cbd5e1', '--border-radius': '4px' };

  return (
    <IonPage>
      <IonContent style={{ '--background': '#f5f7fa' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 16px' }}>

          {/* ── Hero card ── */}
          <div style={{
            background: 'white', borderRadius: '12px',
            boxShadow: '0 14px 35px rgba(10,19,45,.10)',
            overflow: 'hidden'
          }}>
            <div style={{ height: 6, background: 'linear-gradient(90deg, #006FB3 0 45%, #FE6565 45% 70%, #2D717C 70%)' }} />
            <div style={{ padding: '24px 28px' }}>

              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.78rem', color: '#006FB3', fontWeight: 700, margin: '0 0 6px' }}>
                    Registro ciudadano
                  </p>
                  <h2 style={{ margin: '0 0 6px', color: '#0A132D', fontWeight: 700, fontSize: '1.2rem' }}>
                    Crear cuenta municipal
                  </h2>
                  <p style={{ margin: 0, color: '#4A4A4A', fontSize: '.92rem' }}>
                    Formulario con campos obligatorios, validación visual y estructura preparada para rutas públicas/protegidas.
                  </p>
                </div>
                <IonButton
                  fill="outline"
                  routerLink="/login"
                  style={{ '--color': '#006FB3', '--border-color': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0, flexShrink: 0 }}
                >
                  Ya tengo cuenta
                </IonButton>
              </div>

              {/* ── Form rows (2-col grid) ── */}

              {/* Row 1: nombre + rut */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Nombre de usuario" required>
                  <IonItem lines="full" style={itemStyle}>
                    <IonInput placeholder="Ej: María González" value={formData.nombre} onIonInput={(e) => set('nombre')(e.detail.value!)} />
                  </IonItem>
                </Field>
                <Field label="RUT" required>
                  <IonItem lines="full" style={itemStyle}>
                    <IonInput placeholder="12.345.678-9" value={formData.rut} onIonInput={(e) => set('rut')(e.detail.value!)} />
                  </IonItem>
                </Field>
              </div>

              {/* Row 2: correo + region */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Correo electrónico" required>
                  <IonItem lines="full" style={itemStyle}>
                    <IonInput type="email" placeholder="correo@ejemplo.cl" value={formData.correo} onIonInput={(e) => set('correo')(e.detail.value!)} />
                  </IonItem>
                  {formData.correo.includes('@') && (
                    <p style={{ margin: '4px 0 0', fontSize: '.78rem', color: '#2D717C' }}>✓ Formato de correo válido.</p>
                  )}
                </Field>
                <Field label="Región" required>
                  <IonItem lines="full" style={{ ...itemStyle, '--padding-start': '10px' }}>
                    <IonSelect
                      placeholder="Selecciona una región"
                      value={formData.region}
                      onIonChange={(e) => setFormData(prev => ({ ...prev, region: e.detail.value, comuna: '' }))}
                    >
                      {REGIONES_CHILE.map(r => (
                        <IonSelectOption key={r.nombre} value={r.nombre}>{r.nombre}</IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </Field>
              </div>

              {/* Row 3: comuna + telefono */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Comuna" required>
                  <IonItem lines="full" style={{ ...itemStyle, '--padding-start': '10px' }} disabled={!formData.region}>
                    <IonSelect
                      placeholder="Selecciona una comuna"
                      value={formData.comuna}
                      onIonChange={(e) => set('comuna')(e.detail.value)}
                    >
                      {comunasDisponibles.map(c => (
                        <IonSelectOption key={c} value={c}>{c}</IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </Field>
                <Field label="Teléfono de contacto">
                  <IonItem lines="full" style={itemStyle}>
                    <IonInput placeholder="+56 9 1234 5678" value={formData.telefono} onIonInput={(e) => set('telefono')(e.detail.value!)} />
                  </IonItem>
                </Field>
              </div>

              {/* Row 4: pass + confirmPass */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Contraseña" required helper="Usa mayúsculas, números y símbolos.">
                  <IonItem lines="full" style={itemStyle}>
                    <IonInput type="password" placeholder="Mínimo 8 caracteres" value={formData.pass} onIonInput={(e) => set('pass')(e.detail.value!)} />
                  </IonItem>
                </Field>
                <Field label="Confirmación de contraseña" required>
                  <IonItem lines="full" style={itemStyle}>
                    <IonInput type="password" placeholder="Repite la contraseña" value={formData.confirmPass} onIonInput={(e) => set('confirmPass')(e.detail.value!)} />
                  </IonItem>
                  {formData.confirmPass && formData.pass !== formData.confirmPass && (
                    <p style={{ margin: '4px 0 0', fontSize: '.78rem', color: '#8b1f1f' }}>Las contraseñas no coinciden.</p>
                  )}
                </Field>
              </div>

              {/* Checkbox terminos */}
              <IonItem lines="none" style={{ '--background': 'transparent', '--padding-start': '0', marginBottom: '20px' }}>
                <IonCheckbox
                  checked={formData.terminos}
                  onIonChange={(e) => set('terminos')(e.detail.checked)}
                  style={{ marginRight: '10px' }}
                />
                <IonLabel className="ion-text-wrap" style={{ fontSize: '.86rem', color: '#4A4A4A' }}>
                  Acepto los Términos y Condiciones y la política de tratamiento de datos.
                </IonLabel>
              </IonItem>

              {/* Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <IonButton
                  disabled={!isFormValid}
                  routerLink="/ciudadano/ingreso"
                  style={{ '--background': '#006FB3', '--border-radius': '4px', fontWeight: 700, margin: 0 }}
                >
                  <IonIcon icon={checkmarkOutline} slot="start" />
                  Crear cuenta
                </IonButton>
                <IonButton
                  fill="clear"
                  routerLink="/login"
                  style={{ '--color': '#4A4A4A', margin: 0, fontWeight: 700 }}
                >
                  Cancelar y volver al login
                </IonButton>
              </div>

            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Registro;