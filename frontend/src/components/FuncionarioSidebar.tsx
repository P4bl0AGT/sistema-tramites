import { IonIcon, useIonRouter } from '@ionic/react';
import { briefcaseOutline } from 'ionicons/icons';
import React from 'react';

const funcLinks = [
  { label: 'Bandeja', href: '/funcionario/bandeja' },
  { label: 'Alertas', href: '/funcionario/alertas' },
  { label: 'Revisión', href: '/funcionario/revision' },
];

interface FuncionarioSidebarProps {
  activePath: string;
}

const FuncionarioSidebar: React.FC<FuncionarioSidebarProps> = ({ activePath }) => {
  const router = useIonRouter();

  return (
    <aside className="muni-sidebar muni-sidebar--funcionario">
      <div className="muni-sidebar__title">
        <IonIcon icon={briefcaseOutline} className="muni-sidebar__icon muni-sidebar__icon--funcionario" />
        Funcionario
      </div>

      <nav className="muni-sidebar__nav">
        {funcLinks.map(({ label, href }) => {
          const isActive = activePath === href;

          return (
            <button
              key={href}
              type="button"
              onClick={() => router.push(href, 'forward', 'push')}
              className={`muni-sidebar__link muni-sidebar__link--funcionario ${isActive ? 'is-active' : ''}`}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default FuncionarioSidebar;
