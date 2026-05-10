import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { checkmarkOutline } from 'ionicons/icons';
import React, { useMemo, useState } from 'react';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';

// ── Data ──────────────────────────────────────────────────────────────────────
const REGIONES_CHILE = [
<<<<<<< Updated upstream
  {
    nombre: "Antofagasta",
    comunas: ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"]
  },
  {
    nombre: "Araucanía",
    comunas: ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"]
  },
  {
    nombre: "Arica y Parinacota",
    comunas: ["Arica", "Camarones", "General Lagos", "Putre"]
  },
  {
    nombre: "Atacama",
    comunas: ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"]
  },
  {
    nombre: "Aysén del Gral. Carlos Ibáñez del Campo",
    comunas: ["Aysén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O'Higgins", "Río Ibáñez", "Tortel"]
  },
  {
    nombre: "Biobío",
    comunas: ["Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"]
  },
  {
    nombre: "Coquimbo",
    comunas: ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paiguano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"]
  },
  {
    nombre: "Libertador Gral. Bernardo O’Higgins",
    comunas: ["Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchihue", "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Vicente", "Santa Cruz"]
  },
  {
    nombre: "Los Lagos",
    comunas: ["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"]
  },
  {
    nombre: "Los Ríos",
    comunas: ["Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"]
  },
  {
    nombre: "Magallanes y de la Antártica Chilena",
    comunas: ["Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"]
  },
  {
    nombre: "Maule",
    comunas: ["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"]
  },
  {
    nombre: "Metropolitana de Santiago",
    comunas: ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"]
  },
  {
    nombre: "Ñuble",
    comunas: ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
  },
  {
    nombre: "Tarapacá",
    comunas: ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"]
  },
  {
    nombre: "Valparaíso",
    comunas: ["Algarrobo", "Cabildo", "Calera", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Cruz", "La Ligua", "Limache", "Llaillay", "Los Andes", "Nogales", "Olmué", "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"]
  }
=======
  { nombre: 'Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre'] },
  { nombre: 'Región de Valparaíso', comunas: ['Santo Domingo', 'San Antonio', 'El Tabo', 'Cartagena', 'Valparaíso', 'Viña del Mar'] },
  { nombre: 'Región Metropolitana', comunas: ['Santiago', 'Providencia', 'Maipú', 'Las Condes'] },
  { nombre: "Región de O'Higgins", comunas: ['Rancagua', 'San Fernando', 'Pichilemu'] },
>>>>>>> Stashed changes
];

// ── Helper: labeled input field ───────────────────────────────────────────────
const Field: React.FC<{
  label: string;
  required?: boolean;
  helper?: string;
  children: React.ReactNode;
}> = ({ label, required, helper, children }) => (
  <div className="muni-form-group">
    <label className="muni-form-label">
      {label}
      {required && <span className="muni-required"> *</span>}
    </label>
    {children}
    {helper && <p className="muni-error-text">{helper}</p>}
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────
const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    correo: '',
    telefono: '',
    region: '',
    comuna: '',
    pass: '',
    confirmPass: '',
    terminos: false,
  });

  const set = (key: keyof typeof formData) => (val: any) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const comunasDisponibles = useMemo(() => {
    const r = REGIONES_CHILE.find((r) => r.nombre === formData.region);
    return r ? r.comunas : [];
  }, [formData.region]);

  const isFormValid =
    formData.nombre.trim() !== '' &&
    isValidRut(formData.rut) &&
    isValidEmail(formData.correo) &&
    formData.region !== '' &&
    formData.comuna !== '' &&
    formData.pass.length >= 8 &&
    formData.pass === formData.confirmPass &&
    formData.terminos;

<<<<<<< Updated upstream
// ── Formatters ────────────────────────────────────────────────────────────────
const formatRut = (raw: string): string => {
  const clean = raw.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  const grouped = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${grouped}-${dv}`;
};

const formatPhone = (raw: string): string => {
  const clean = raw.replace(/[^\d+]/g, '');
  // +56 9 XXXX XXXX
  const digits = clean.startsWith('+56') ? clean.slice(3).replace(/\D/g, '') : clean.replace(/\D/g, '');
  const d = digits.slice(0, 9);
  if (d.length <= 1) return d ? `+56 ${d}` : '';
  if (d.length <= 5) return `+56 ${d[0]} ${d.slice(1)}`;
  return `+56 ${d[0]} ${d.slice(1, 5)} ${d.slice(5)}`;
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const isValidRut = (rut: string) => {
  const clean = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 8) return false;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  let sum = 0, mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const expected = 11 - (sum % 11);
  const calc = expected === 11 ? '0' : expected === 10 ? 'K' : String(expected);
  return calc === dv;
};

  const itemStyle = {
    '--background': 'white',
    '--background-focused': 'white',
    '--border-color': '#cbd5e1',
    '--border-radius': '4px',
    '--color': '#0A132D',
    '--highlight-color-focused': '#006FB3',
  };

  return (
    <IonPage>
      <IonContent style={{ '--background': '#f5f7fa', colorScheme: 'light' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 16px' }}>
=======
  return (
    <IonPage>
      <PageHeader />
>>>>>>> Stashed changes

      <IonContent className="muni-ion-content">
        <main className="muni-content-area">
          <div className="muni-register-container">
            {/* ── Hero card ── */}
            <div className="muni-register-card">
              <div className="muni-color-strip" />

              <div className="muni-register-body">
                {/* Header row */}
                <div className="muni-register-header-row">
                  <div>
                    <p className="muni-kicker">Registro ciudadano</p>
                    <h2 className="muni-heading">Crear cuenta municipal</h2>
                    <p className="muni-text">
                      Formulario con campos obligatorios, validación visual y estructura preparada para rutas públicas/protegidas.
                    </p>
                  </div>

                  <IonButton fill="outline" routerLink="/login" className="muni-btn-outline-primary">
                    Ya tengo cuenta
                  </IonButton>
                </div>

                {/* ── Form rows (2-col grid) ── */}

                {/* Row 1: nombre + rut */}
                <div className="muni-form-grid-2">
                  <Field label="Nombre de usuario" required>
                    <IonItem lines="full" className="muni-input">
                      <IonInput placeholder="Ej: María González" value={formData.nombre} onIonInput={(e) => set('nombre')(e.detail.value!)} />
                    </IonItem>
                  </Field>

                  <Field label="RUT" required>
                    <IonItem lines="full" className="muni-input">
                      <IonInput placeholder="12.345.678-9" value={formData.rut} onIonInput={(e) => set('rut')(e.detail.value!)} />
                    </IonItem>
                  </Field>
                </div>

                {/* Row 2: correo + region */}
                <div className="muni-form-grid-2">
                  <Field label="Correo electrónico" required>
                    <IonItem lines="full" className="muni-input">
                      <IonInput type="email" placeholder="correo@ejemplo.cl" value={formData.correo} onIonInput={(e) => set('correo')(e.detail.value!)} />
                    </IonItem>
                    {formData.correo.includes('@') && <p className="muni-valid-text">✓ Formato de correo válido.</p>}
                  </Field>

                  <Field label="Región" required>
                    <IonItem lines="full" className="muni-select">
                      <IonSelect
                        placeholder="Selecciona una región"
                        value={formData.region}
                        onIonChange={(e) => setFormData((prev) => ({ ...prev, region: e.detail.value, comuna: '' }))}
                      >
                        {REGIONES_CHILE.map((r) => (
                          <IonSelectOption key={r.nombre} value={r.nombre}>
                            {r.nombre}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                  </Field>
                </div>

                {/* Row 3: comuna + telefono */}
                <div className="muni-form-grid-2">
                  <Field label="Comuna" required>
                    <IonItem lines="full" className="muni-select" disabled={!formData.region}>
                      <IonSelect placeholder="Selecciona una comuna" value={formData.comuna} onIonChange={(e) => set('comuna')(e.detail.value)}>
                        {comunasDisponibles.map((c) => (
                          <IonSelectOption key={c} value={c}>
                            {c}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                  </Field>

                  <Field label="Teléfono de contacto">
                    <IonItem lines="full" className="muni-input">
                      <IonInput placeholder="+56 9 1234 5678" value={formData.telefono} onIonInput={(e) => set('telefono')(e.detail.value!)} />
                    </IonItem>
                  </Field>
                </div>

                {/* Row 4: pass + confirmPass */}
                <div className="muni-form-grid-2">
                  <Field label="Contraseña" required helper="Usa mayúsculas, números y símbolos.">
                    <IonItem lines="full" className="muni-input">
                      <IonInput type="password" placeholder="Mínimo 8 caracteres" value={formData.pass} onIonInput={(e) => set('pass')(e.detail.value!)} />
                    </IonItem>
                  </Field>

                  <Field label="Confirmación de contraseña" required>
                    <IonItem lines="full" className="muni-input">
                      <IonInput type="password" placeholder="Repite la contraseña" value={formData.confirmPass} onIonInput={(e) => set('confirmPass')(e.detail.value!)} />
                    </IonItem>
                    {formData.confirmPass && formData.pass !== formData.confirmPass && <p className="muni-error-text">Las contraseñas no coinciden.</p>}
                  </Field>
                </div>

                {/* Checkbox terminos */}
                <IonItem lines="none" className="muni-checkbox-row">
                  <IonCheckbox checked={formData.terminos} onIonChange={(e) => set('terminos')(e.detail.checked)} className="muni-checkbox" />
                  <IonLabel className="ion-text-wrap muni-text-sm">
                    Acepto los Términos y Condiciones y la política de tratamiento de datos.
                  </IonLabel>
                </IonItem>

                {/* Actions */}
                <div className="muni-form-actions">
                  <IonButton disabled={!isFormValid} routerLink="/ciudadano/ingreso" className="muni-btn-primary">
                    <IonIcon icon={checkmarkOutline} slot="start" />
                    Crear cuenta
                  </IonButton>

                  <IonButton fill="clear" routerLink="/login" className="muni-btn-clear">
                    Cancelar y volver al login
                  </IonButton>
                </div>
              </div>
<<<<<<< Updated upstream

              

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
                    <IonInput placeholder="12.345.678-9" value={formData.rut} onIonInput={(e) => {
                      const raw = e.detail.value ?? '';
                      const clean = raw.replace(/[^0-9kK]/g, '');
                      set('rut')(clean.length > 1 ? formatRut(clean) : clean);
                    }}/>
                    {formData.rut && (
                      <p style={{ margin: '4px 0 0', fontSize: '.78rem', color: isValidRut(formData.rut) ? '#2D717C' : '#8b1f1f' }}>
                        {isValidRut(formData.rut) ? '✓ RUT válido.' : '✗ RUT inválido.'}
                      </p>
                    )}
                  </IonItem>
                </Field>
              </div>

              {/* Row 2: correo + region */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Correo electrónico" required>
                  <IonItem lines="full" style={itemStyle}>
                    <IonInput type="email" placeholder="correo@ejemplo.cl" value={formData.correo} onIonInput={(e) => set('correo')(e.detail.value!)} />
                      {formData.correo && (
                        <p style={{ margin: '4px 0 0', fontSize: '.78rem', color: isValidEmail(formData.correo) ? '#2D717C' : '#8b1f1f' }}>
                          {isValidEmail(formData.correo) ? '✓ Formato de correo válido.' : '✗ Correo inválido.'}
                        </p>
                      )}
                  </IonItem>
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
                    <IonInput placeholder="+56 9 1234 5678" value={formData.telefono} onIonInput={(e) => {
                      const raw = e.detail.value ?? '';
                      set('telefono')(formatPhone(raw));
                    }} />
                    {formData.telefono && formData.telefono.replace(/\D/g, '').length < 11 && (
                      <p style={{ margin: '4px 0 0', fontSize: '.78rem', color: '#8b1f1f' }}>✗ Teléfono incompleto.</p>
                    )}
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
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '20px' }}>
                <IonCheckbox
                  checked={formData.terminos}
                  onIonChange={(e) => set('terminos')(e.detail.checked)}
                  style={{ flexShrink: 0, marginTop: '2px' }}
                />
                <span style={{ fontSize: '.86rem', color: '#4A4A4A', lineHeight: '1.4' }}>
                  Acepto los Términos y Condiciones y la política de tratamiento de datos.
                </span>
              </div>

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

=======
>>>>>>> Stashed changes
            </div>
          </div>
        </main>

        <PageFooter />
      </IonContent>
    </IonPage>
  );
};

export default Registro;
