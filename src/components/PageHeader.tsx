import { IonButton, IonIcon } from '@ionic/react';
import { callOutline, contrastOutline, logOutOutline, textOutline } from 'ionicons/icons';
import React from 'react';

interface PageHeaderProps {
  showLogout?: boolean;
}

const handleLogout = () => {
  window.location.href = '/login';
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
  return (
    <header className="muni-page-header">
      <section className="muni-gob-topbar">
        <div className="muni-container muni-gob-topbar__inner">
          <GobiernoLogo />

          <div className="muni-accessibility-actions">
            <button type="button" className="muni-top-action-button">
              <IonIcon icon={contrastOutline} />
              Contraste
            </button>

            <button type="button" className="muni-top-action-button">
              <IonIcon icon={textOutline} />
              A+
            </button>

            <button type="button" className="muni-top-action-button">
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
            <IonButton fill="outline" size="small" onClick={handleLogout} className="muni-header-logout">
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          )}
        </div>
      </section>

      <section className="muni-main-navbar">
        <div className="muni-container muni-main-navbar__inner">
          <div className="muni-nav-status">
            <IonIcon icon={callOutline} />
            <span className="muni-nav-badge">3</span>
          </div>
        </div>
      </section>
    </header>
  );
};

export default PageHeader;
