import { useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
  '/': 'Ver Colección',
  '/mark-owned': 'Marcar En el álbum',
  '/mark-duplicate': 'Marcar Duplicadas',
  '/statistics': 'Estadísticas',
  '/search': 'Buscar',
  '/export': 'Exportar',
};

export function Header() {
  const location = useLocation();
  const title = titles[location.pathname] || 'Colección';

  return (
    <header className="mb-6">
      <h2 className="header">
        {title}
      </h2>
    </header>
  );
}