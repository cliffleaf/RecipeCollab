import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RecipeEditor.css'
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
        navigate('/edit', { state: { recipe: recipeData } });
    }

    return (
        <div className="editor-container">
            <Button appearance="primary" onClick={handleClick}><EditFilledIcon label=""/></Button>
            <h1 className="editor-input h1-style-input">{recipeData.title}</h1>
            <text className="editor-input">{recipeData.author}</text>
            <text className="editor-input">{recipeData.category}</text>
            <text className="editor-input">{recipeData.article}</text>
        </div>
    );
};

export default RecipeViewer;
