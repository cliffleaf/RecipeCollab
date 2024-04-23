import TopNav from "../components/TopNav";
import RecipeCard from "../components/RecipeCard";
import SideNav from "../components/SideNav";

const RecipeList = () => {
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
                        <RecipeCard id="1" title="Orange Chicken" author="Kevin Liang" imgUrl="path_to_image"/>
                        <RecipeCard id="1" title="Orange Chicken" author="Kevin Liang" imgUrl="path_to_image"/>
                        <RecipeCard id="1" title="Orange Chicken" author="Kevin Liang" imgUrl="path_to_image"/>
                    </div>
                </section>
            </div>
        </>
    );
}

export default RecipeList;