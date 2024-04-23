import TopNav from "../components/TopNav";
import RecipeCard from "../components/RecipeCard";
import SideNav from "../components/SideNav";

const RecipesPage = () => {
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
                {/*<RecipeEditor />*/}
            </div>
        </>
    );
}

export default RecipesPage;