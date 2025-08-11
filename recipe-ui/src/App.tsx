// src/App.tsx
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import { listDocs, type DocListItem } from './api';
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

  return (
    <div className="layout">
      <header className="topbar">
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
          onSelect={(id) => navigate(`/recipes/${id}`)}
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
