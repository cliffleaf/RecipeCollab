import React from 'react';
import '../css/App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import RecipesPage from "./RecipesPage";
import UploadRecipePage from "./UploadRecipePage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<RecipesPage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/upload" element={<UploadRecipePage />} />
              {/*<Route path="/recipes/:id" element={<ViewRecipePage />} />*/}
              {/* A catch-all route that redirects to the home page */}
              <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
      </BrowserRouter>

  );
}

export default App;
