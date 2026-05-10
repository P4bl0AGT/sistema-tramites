import { 
  IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel, 
  IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons, 
  IonSelect, IonSelectOption, IonCheckbox 
} from '@ionic/react';
import React, { useState, useMemo } from 'react';

// Datos de Chile (puedes expandir esta lista según necesites)
const REGIONES_CHILE = [
  { nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre"] },
  { nombre: "Valparaíso", comunas: ["Santo Domingo", "San Antonio", "Valparaíso", "Viña del Mar"] },
  { nombre: "Metropolitana", comunas: ["Santiago", "Providencia", "Maipú", "Las Condes"] },
  // Agregar más regiones aquí...
];

const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '', rut: '', correo: '', region: '', comuna: '', pass: '', confirmPass: '', terminos: false
  });

  // Filtrar comunas según región seleccionada
  const comunasDisponibles = useMemo(() => {
    const regionEncontrada = REGIONES_CHILE.find(r => r.nombre === formData.region);
    return regionEncontrada ? regionEncontrada.comunas : [];
  }, [formData.region]);

  // Validación de formulario completo
  const isFormValid = 
    formData.nombre.trim() !== '' && 
    formData.rut.trim() !== '' && 
    formData.correo.includes('@') &&
    formData.region !== '' &&
    formData.comuna !== '' &&
    formData.pass !== '' &&
    formData.pass === formData.confirmPass &&
    formData.terminos;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--gob-primary)', '--color': 'white' }}>
          <IonButtons slot="start"><IonBackButton defaultHref="/login" /></IonButtons>
          <IonTitle>Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': 'var(--muni-sand)' }}>
        <h3 className="ion-text-center" style={{ color: 'var(--gob-tertiary)', fontWeight: 'bold', marginBottom: '30px' }}>
          Registro de Ciudadano
        </h3>

        {/* Uso de margen en cada Item para evitar que estén pegados */}
        <IonItem lines="full" className="ion-margin-bottom">
          <IonLabel position="floating">Nombre Completo</IonLabel>
          <IonInput onIonInput={(e) => setFormData({...formData, nombre: e.detail.value!})} />
        </IonItem>

        <IonItem lines="full" className="ion-margin-bottom">
          <IonLabel position="floating">RUT</IonLabel>
          <IonInput onIonInput={(e) => setFormData({...formData, rut: e.detail.value!})} />
        </IonItem>

        <IonItem lines="full" className="ion-margin-bottom">
          <IonLabel position="floating">Correo Electrónico</IonLabel>
          <IonInput type="email" onIonInput={(e) => setFormData({...formData, correo: e.detail.value!})} />
        </IonItem>

        {/* Selector de Región */}
        <IonItem lines="full" className="ion-margin-bottom">
          <IonLabel position="floating">Región</IonLabel>
          <IonSelect placeholder="Seleccione Región" onIonChange={(e) => setFormData({...formData, region: e.detail.value, comuna: ''})}>
            {REGIONES_CHILE.map(r => <IonSelectOption key={r.nombre} value={r.nombre}>{r.nombre}</IonSelectOption>)}
          </IonSelect>
        </IonItem>

        {/* Selector de Comuna (habilitado solo si hay región) */}
        <IonItem lines="full" className="ion-margin-bottom" disabled={!formData.region}>
          <IonLabel position="floating">Comuna</IonLabel>
          <IonSelect placeholder="Seleccione Comuna" value={formData.comuna} onIonChange={(e) => setFormData({...formData, comuna: e.detail.value})}>
            {comunasDisponibles.map(c => <IonSelectOption key={c} value={c}>{c}</IonSelectOption>)}
          </IonSelect>
        </IonItem>

        <IonItem lines="full" className="ion-margin-bottom">
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password" onIonInput={(e) => setFormData({...formData, pass: e.detail.value!})} />
        </IonItem>

        <IonItem lines="full" className="ion-margin-bottom">
          <IonLabel position="floating">Confirmar Contraseña</IonLabel>
          <IonInput type="password" onIonInput={(e) => setFormData({...formData, confirmPass: e.detail.value!})} />
        </IonItem>

        <IonItem lines="none" className="ion-margin-top">
          <IonCheckbox slot="start" onIonChange={(e) => setFormData({...formData, terminos: e.detail.checked})} />
          <IonLabel className="ion-text-wrap" style={{ fontSize: '14px' }}>Acepto los términos y condiciones.</IonLabel>
        </IonItem>

        <IonButton 
          expand="block" 
          disabled={!isFormValid} 
          routerLink="/ciudadano/ingreso" 
          style={{ '--background': 'var(--gob-primary)', marginTop: '30px' }}
        >
          Finalizar Registro
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Registro;