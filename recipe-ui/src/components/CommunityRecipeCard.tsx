import React from "react";
import '../css/RecipeCard.css'
import {Link} from "react-router-dom";

type RecipeProps = {
    id: string;
    title: string;
    author: string;
    imgUrl: string;
};

/**
 * When a user creates a recipe, the recipie is associated with the user by userId
 * The user can choose to share the recipe to one or more communities
 * 
 * DB storage: 
 *  - recipe-user (many-to-one), stored on recipe side
 *  - recipe-community (many-to-many), stored on community side
 * @param param0 
 * @returns - CommunityRecipeCard component, used to display a recipe in the community recipe list
 */

const CommunityRecipeCard: React.FC<RecipeProps> = ( {id, title, author, imgUrl} ) => {
    const link = `/recipes/${id}`;
    return (
        <div className="recipe-card">
            <img src={imgUrl} alt={title} className="recipe-image" />
            <div className="recipe-card-text">
                <h3><Link to={link}>{title}</Link></h3>
                <p>@{author}</p>
            </div>
        </div>
    );
};

export default CommunityRecipeCard;