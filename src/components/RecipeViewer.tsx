import React from 'react';
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

const RecipeViewer: React.FC<RecipeViewerProps> = ( {id} ) => {
    const {title, author, category, article}: RecipeInfo = {
        title: "Orange Chicken",
        author: "Kevin Liang",
        category: "Food",
        article: "step 1"
    };

    const handleClick = () => {

    }

    return (
        <div className="editor-container">
            <Button appearance="primary" onClick={handleClick}><EditFilledIcon label=""/></Button>
            <h3 className="recipe-info">{title}</h3>
            <text className="recipe-info">{author}</text>
            <text className="recipe-info">{category}</text>
            <text className="recipe-info">{article}</text>
        </div>
    );
}

export default RecipeViewer;
