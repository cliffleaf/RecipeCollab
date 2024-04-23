import TopNav from "../components/TopNav";
import RecipeViewer from "../components/RecipeViewer";

const ViewRecipePage = () => {
    return (
        <>
            <div className="app-container">
                <div className="app-top-nav">
                    <TopNav/>
                </div>
                <RecipeViewer />
            </div>
        </>
    );
}

export default ViewRecipePage;