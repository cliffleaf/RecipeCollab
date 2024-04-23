import TopNav from "../components/TopNav";
import RecipeEditor from "../components/RecipeEditor";
import { useLocation } from 'react-router-dom';

const UploadRecipePage = () => {
    const location = useLocation();
    const recipe = location.state?.recipe;

    return (
        <>
            <div className="app-container">
                <div className="app-top-nav">
                    <TopNav/>
                </div>
                <RecipeEditor recipe={recipe} />
            </div>
        </>
    );
}

export default UploadRecipePage;