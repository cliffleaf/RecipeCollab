import React from "react";
import '../css/RecipeCard.css'

type RecipeProps = {
    title: string;
    author: string;
    imgUrl: string;
};

const RecipeCard: React.FC<RecipeProps> = ( {title, author, imgUrl} ) => {

    return (
        <div className="recipe-card">
            <img src={imgUrl} alt={title} className="recipe-image" />
            <div className="recipe-card-text">
                <h3>{title}</h3>
                <p>{author}</p>
            </div>
        </div>
    )
};

export default RecipeCard;