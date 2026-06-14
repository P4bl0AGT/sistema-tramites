import { IonButton, IonIcon } from '@ionic/react';
import { contrastOutline, logOutOutline, textOutline, personCircleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { authService } from '../services/auth.service';
import { storageKeys, storageService } from '../services/storage.service';

interface PageHeaderProps {
  showLogout?: boolean;
}

const handleLogout = () => {
  authService.logout();
  window.location.href = '/login';
};

const ZOOM_MIN = -1;
const ZOOM_MAX = 2;

const getStoredZoom = () => {
  const value = Number(storageService.get(storageKeys.zoomLevel) ?? '0');
  return Number.isFinite(value) ? Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value)) : 0;
};

const GobiernoLogo: React.FC = () => (
  <div className="muni-gob-logo">
    <div className="muni-gob-flag">
      <div className="muni-gob-flag__white" />
      <div className="muni-gob-flag__blue" />
      <div className="muni-gob-flag__red" />
    </div>

    <div className="muni-gob-text">
      Gobierno
      <br />
      de Chile
    </div>
  </div>
);

const PageHeader: React.FC<PageHeaderProps> = ({ showLogout = false }) => {
  const role = authService.getRole();
  const user = authService.getCurrentUser();
  const displayName = role === 'funcionario' ? 'Funcionario' : (user?.nombre ?? '');
  const [darkMode, setDarkMode] = useState(
    () => storageService.get(storageKeys.darkMode) === 'true'
  );
  const [zoomLevel, setZoomLevel] = useState(getStoredZoom);

  useEffect(() => {
    document.documentElement.classList.toggle('muni-dark-mode', darkMode);
    storageService.set(storageKeys.darkMode, String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('muni-zoom-out', 'muni-zoom-in', 'muni-zoom-in-more');

    if (zoomLevel === -1) root.classList.add('muni-zoom-out');
    if (zoomLevel === 1) root.classList.add('muni-zoom-in');
    if (zoomLevel === 2) root.classList.add('muni-zoom-in-more');

    storageService.set(storageKeys.zoomLevel, String(zoomLevel));
  }, [zoomLevel]);

  const increaseZoom = () => {
    setZoomLevel((current) => Math.min(ZOOM_MAX, current + 1));
  };

  const decreaseZoom = () => {
    setZoomLevel((current) => Math.max(ZOOM_MIN, current - 1));
  };

  return (
    <header className="muni-page-header">
      <section className="muni-gob-topbar">
        <div className="muni-container muni-gob-topbar__inner">
          <GobiernoLogo />

          <div className="muni-accessibility-actions">
            <button
              type="button"
              className="muni-top-action-button"
              onClick={() => setDarkMode((current) => !current)}
              aria-pressed={darkMode}
              title="Alternar modo oscuro"
            >
              <IonIcon icon={contrastOutline} />
              Contraste
            </button>

            <button
              type="button"
              className="muni-top-action-button"
              onClick={increaseZoom}
              disabled={zoomLevel === ZOOM_MAX}
              title="Aumentar zoom"
            >
              <IonIcon icon={textOutline} />
              A+
            </button>

            <button
              type="button"
              className="muni-top-action-button"
              onClick={decreaseZoom}
              disabled={zoomLevel === ZOOM_MIN}
              title="Disminuir zoom"
            >
              <IonIcon icon={textOutline} />
              A-
            </button>
          </div>
        </div>
      </section>

      <section className="muni-municipal-header">
        <div className="muni-container muni-municipal-header__inner">
          <div className="muni-municipal-brand">
            <img
              src="/assets/santo-domingo.jpg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/santo%20domingo.jpg';
              }}
              alt="Logo Municipalidad de Santo Domingo"
              className="muni-municipal-logo"
            />

            <div>
              <p className="muni-municipal-subtitle">I. Municipalidad de Santo Domingo</p>
              <h1 className="muni-municipal-title">Portal de Trámites Municipales</h1>
            </div>
          </div>

          {showLogout && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {displayName && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: role === 'funcionario' ? '#e7f1fb' : '#f0faf7',
                  border: `1px solid ${role === 'funcionario' ? '#b6d4ef' : '#a7d9cc'}`,
                  borderRadius: '999px', padding: '4px 12px 4px 8px',
                  fontSize: '.82rem', fontWeight: 700,
                  color: role === 'funcionario' ? '#075d92' : '#1d5d64',
                  whiteSpace: 'nowrap',
                }}>
                  <IonIcon icon={personCircleOutline} style={{ fontSize: '18px' }} />
                  {displayName}
                </div>
              )}
              <IonButton fill="outline" size="small" onClick={handleLogout} className="muni-header-logout">
                <IonIcon icon={logOutOutline} slot="start" />
                Salir
              </IonButton>
            </div>
          )}
        </div>
      </section>

      <section className="muni-main-navbar">
        <div className="muni-container muni-main-navbar__inner">
        </div>
      </section>
    </header>
  );
};

export default PageHeader;
