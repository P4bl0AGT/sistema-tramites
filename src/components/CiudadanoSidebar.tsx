import { IonIcon, useIonRouter } from '@ionic/react';
import { listOutline } from 'ionicons/icons';
import React from 'react';

const navLinks = [
  { label: 'Iniciar trámite', href: '/ciudadano/ingreso' },
  { label: 'Trazabilidad', href: '/ciudadano/trazabilidad' },
  { label: 'Subsanación', href: '/ciudadano/subsanacion' },
  { label: 'Notificaciones', href: '/ciudadano/notificaciones' },
];

interface CiudadanoSidebarProps {
  activePath: string;
}

const CiudadanoSidebar: React.FC<CiudadanoSidebarProps> = ({ activePath }) => {
  const router = useIonRouter();

  return (
    <aside className="muni-sidebar muni-sidebar--ciudadano">
      <div className="muni-sidebar__title">
        <IonIcon icon={listOutline} className="muni-sidebar__icon muni-sidebar__icon--ciudadano" />
        Ciudadano
      </div>

      <nav className="muni-sidebar__nav">
        {navLinks.map(({ label, href }) => {
          const isActive = activePath === href;

          return (
            <button
              key={href}
              type="button"
              onClick={() => router.push(href, 'forward', 'push')}
              className={`muni-sidebar__link muni-sidebar__link--ciudadano ${isActive ? 'is-active' : ''}`}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default CiudadanoSidebar;
