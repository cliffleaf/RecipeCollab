import TopNav from "../components/TopNav";
import RecipeEditor from "../components/RecipeEditor";

const ViewRecipePage = () => {
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

export default ViewRecipePage;