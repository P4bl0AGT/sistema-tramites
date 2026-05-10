import { IonIcon } from '@ionic/react';
import { accessibilityOutline, callOutline, documentTextOutline } from 'ionicons/icons';
import React from 'react';

const PageFooter: React.FC = () => {
  return (
    <footer className="muni-page-footer">
      <div className="muni-container muni-page-footer__inner">
        <div className="muni-footer-left">
          <strong>Copyright © 2026 I. Municipalidad de Santo Domingo</strong>

          <img
            src="/assets/santo-domingo.jpg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/assets/santo%20domingo.jpg';
            }}
            alt="Municipalidad de Santo Domingo"
            className="muni-footer-logo"
          />
        </div>

        <div className="muni-footer-icons">
          <IonIcon icon={accessibilityOutline} />
          <IonIcon icon={documentTextOutline} />
          <IonIcon icon={callOutline} />
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
