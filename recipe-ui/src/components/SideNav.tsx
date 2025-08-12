import type { DocListItem } from '../api';

export function SideNav({
  docs,
  activeId,
  onSelect,
}: {
  docs: DocListItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="sidenav">
      <div className="sidenav-title">Recipes</div>
      <ul className="sidenav-list">
        {docs.map((d) => (
          <li key={d.id}>
            <button
              className={d.id === activeId ? 'nav-item active' : 'nav-item'}
              onClick={() => onSelect(d.id)}
              title={d.title}
            >
              {d.title || 'Untitled'}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}