import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RecipeViewer.css'
import Button from "@atlaskit/button";
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';

type RecipeViewerProps = {id: string};
type RecipeInfo = {
    title: string,
    author: string,
    category: string,
    article: string
}

const RecipeViewer: React.FC<RecipeViewerProps> = ({ id }) => {
    const navigate = useNavigate();

    const recipeData: RecipeInfo = {
        title: "Orange Chicken",
        author: "Kevin Liang",
        category: "Food",
        article: "step 1"
    };

    const handleClick = () => {
        // Navigate and pass the entire recipe data as state
        navigate('/upload', { state: { recipe: recipeData } });
    }

    return (
        <div className="editor-container">
            <Button appearance="primary" onClick={handleClick}><EditFilledIcon label=""/></Button>
            <h3 className="recipe-info">{recipeData.title}</h3>
            <text className="recipe-info">{recipeData.author}</text>
            <text className="recipe-info">{recipeData.category}</text>
            <text className="recipe-info">{recipeData.article}</text>
        </div>
    );
};

export default RecipeViewer;
