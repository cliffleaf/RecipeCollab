import React from "react";
import '../css/ItemCard.css'
import {Link} from "react-router-dom";

type RecipeProps = {
    id: string;
    title: string;
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
 * @returns - ProfileRecipeCard component, used to display a recipe card in a user's profile
 */

const ProfileRecipeCard: React.FC<RecipeProps> = ( {id, title, imgUrl} ) => {
    const link = `/recipes/${id}`;
    return (
        <div className="recipe-card">
            <img src={imgUrl} alt={title} className="recipe-image" />
            <div className="recipe-card-text">
                <h3><Link to={link}>{title}</Link></h3>
            </div>
        </div>
    );
};

export default ProfileRecipeCard;