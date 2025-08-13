// src/App.tsx
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import { listDocs, type DocListItem, deleteDoc } from './api';
import { NewDocButton } from './components/NewButton';
import { SideNav } from './components/SideNav';
import Home from './components/Home';
import RecipeEditorPage from './pages/RecipeEditorPage';

function useActiveIdFromLocation() {
  const { pathname } = useLocation();
  return useMemo(() => {
    const m = pathname.match(/^\/recipes\/([^/]+)/); // <-- plural
    return m ? m[1] : null;
  }, [pathname]);
}


function Layout({
  docs,
  setDocs,
}: {
  docs: DocListItem[];
  setDocs: React.Dispatch<React.SetStateAction<DocListItem[]>>;
}) {
  const activeId = useActiveIdFromLocation();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const ok = await deleteDoc(id);
      if (!ok) throw new Error('Delete failed');
      setDocs((prev) => prev.filter((d) => d.id !== id));
      navigate('/'); // redirect to Home
    } catch (err) {
      console.error(err);
      alert('Failed to delete recipe. Please try again.');
    }
  };

  return (
    <div className="layout">
      <header className="topbar">
        <button className="hamburger-btn" onClick={() => setIsNavOpen(!isNavOpen)} aria-label="open navigation">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            {isNavOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <NewDocButton
          onCreated={(id, title) => {
            setDocs((d) => [{ id, title: title ?? 'Untitled' }, ...d]);
          }}
        />
      </header>

      <div className="main">
        <SideNav
          docs={docs}
          activeId={activeId}
          isOpen={isNavOpen}
          onSelect={(id) => {
            navigate(`/recipes/${id}`);
            setIsNavOpen(false); // close nav on selection
          }}
          onDelete={handleDelete}
        />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [docs, setDocs] = useState<DocListItem[]>([]);

  useEffect(() => {
    (async () => setDocs(await listDocs()))();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout docs={docs} setDocs={setDocs} />}>
          <Route index element={<Home />} />
          <Route
            path="/recipes/:id"
            element={
              <RecipeEditorPage
                onTitleChange={(id, title) => {
                  setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, title } : d)));
                }}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
