import React from "react";
import '../css/RecipeCard.css'
import {Link} from "react-router-dom";

type RecipeProps = {
    id: string;
    title: string;
    author: string;
    imgUrl: string;
};

const RecipeCard: React.FC<RecipeProps> = ( {id, title, author, imgUrl} ) => {
    const link = `/recipes/${id}`;
    return (
        <div className="recipe-card">
            <img src={imgUrl} alt={title} className="recipe-image" />
            <div className="recipe-card-text">
                <h3><Link to={link}>{title}</Link></h3>
                <p>{author}</p>
            </div>
        </div>
    );
};

export default RecipeCard;