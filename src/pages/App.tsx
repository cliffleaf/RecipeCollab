import React from 'react';
import '../css/App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import RecipeList from "./RecipeList";
import UploadRecipePage from "./UploadRecipePage";
import ViewRecipePage from "./ViewRecipePage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/upload" element={<UploadRecipePage />} />
              <Route path="/recipes/:id" element={<ViewRecipePage />} />
              {/* A catch-all route that redirects to the home page */}
              <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
      </BrowserRouter>

  );
}

export default App;
