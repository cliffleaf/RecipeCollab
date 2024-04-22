import React from 'react';
import '../css/App.css';
import RecipeEditor from "./RecipeEditor";
import TopNav from "./TopNav";
import RecipeCard from "./RecipeCard";
import SideNav from "./SideNav";

function App() {
  return (
      <>
          <div className="app-container">
              <div className="app-top-nav">
                  <TopNav/>
              </div>
              <section className="main">
                  <div className="app-side-nav">
                      <SideNav/>
                  </div>
                  <div className="app-recipe-card-container">
                      <RecipeCard title="Orange Chicken" author="Kevin Liang" imgUrl="path_to_image"/>
                      <RecipeCard title="Orange Chicken" author="Kevin Liang" imgUrl="path_to_image"/>
                      <RecipeCard title="Orange Chicken" author="Kevin Liang" imgUrl="path_to_image"/>
                      {/* Repeat RecipeCard for other recipes */}
                  </div>
              </section>
          </div>
      </>
  );
}

export default App;
