import TopNav from "../components/TopNav";
import RecipeViewer from "../components/RecipeViewer";
import { useParams } from 'react-router-dom';

const ViewRecipePage = () => {
    const { id } = useParams();
    if (!id) {
        return <div>Recipe Not Found</div>;
    }

    return (
        <>
            <div className="app-container">
                <div className="app-top-nav">
                    <TopNav/>
                </div>
                <RecipeViewer id={id} />
            </div>
        </>
    );
}

export default ViewRecipePage;