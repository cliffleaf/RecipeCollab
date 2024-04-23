import TopNav from "../components/TopNav";
import RecipeEditor from "../components/RecipeEditor";
import SideNav from "../components/SideNav";

const RecipesPage = () => {
    return (
        <>
            <div className="app-container">
                <div className="app-top-nav">
                    <TopNav/>
                </div>
                <RecipeEditor />
            </div>
        </>
    );
}

export default RecipesPage;