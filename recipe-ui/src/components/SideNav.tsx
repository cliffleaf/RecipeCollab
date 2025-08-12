import type { DocListItem } from '../api';

export function SideNav({
  docs,
  activeId,
  onSelect,
  onDelete,
}: {
  docs: DocListItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <aside className="sidenav">
      <div className="sidenav-title">Recipes</div>
      <ul className="sidenav-list">
        {docs.map((d) => (
          <li key={d.id} className="sidenav-item-row">
            <button
              className={d.id === activeId ? 'nav-item active' : 'nav-item'}
              onClick={() => onSelect(d.id)}
              title={d.title}
            >
              {d.title || 'Untitled'}
            </button>

            <button
              className="delete-btn"
              title="Delete recipe"
              aria-label={`Delete ${d.title || 'Untitled'}`}
              onClick={(e) => {
                e.stopPropagation(); // don't trigger select
                onDelete(d.id);
              }}
            >
              {/* rubbish bin icon  */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 21 6" />
                <rect x="6" y="6" width="12" height="14" rx="2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
