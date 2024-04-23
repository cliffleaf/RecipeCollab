import React from 'react';
import '../css/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
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
              <Route path="/edit" element={<UploadRecipePage />} />
              <Route path="/recipes/:id" element={<ViewRecipePage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
