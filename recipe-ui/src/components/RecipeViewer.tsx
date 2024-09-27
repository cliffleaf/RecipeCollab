import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/Recipe.css'
import EditIcon from '@atlaskit/icon/glyph/edit'
import ShareIcon from '@atlaskit/icon/glyph/share';

type RecipeViewerProps = {id: string};
type RecipeInfo = {
    title: string,
    author: string,
    categories: string[],
    article: string,
    imgUrl?: string,
}

const RecipeViewer: React.FC<RecipeViewerProps> = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState<RecipeInfo | null>(null);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [recipeNotFound, setRecipeNotFound] = useState(false);

    // const recipeData: RecipeInfo = {
    //     title: "Orange Chicken",
    //     author: "东街一只猫",
    //     categories: ["便当", "家常菜"],
    //     article: "step 1"
    // };
    useEffect(() => {
        // Fetch the recipe data from the backend
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://xibm7nq2jf.execute-api.ap-southeast-2.amazonaws.com/default/recipes/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        setRecipeNotFound(true);
                    } else {
                        console.error('Failed to fetch the recipe data');
                    }
                }

                const data = await response.json();
                setRecipeData(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    
    if (!recipeData) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    if (recipeNotFound) {
        return <div>Recipe not found. It might have been deleted</div>;
    }


    const handleEdit = () => {
        navigate('/edit', { state: { recipe: recipeData } });
    }

    const handleShare = () => {
        setShowShareMenu(prev => !prev); // Toggle the share menu
    }

    const handleShareToGroup = () => {
        alert("Share to a community");
        setShowShareMenu(false); // Close the menu after action
    }

    const handleCopyLink = () => {
        const link = window.location.href; // Assuming the current page URL is the shareable link
        navigator.clipboard.writeText(link).then(() => {
            alert("Link copied to clipboard");
        }).catch(err => {
            alert("Failed to copy link: " + err);
        });
        setShowShareMenu(false); // Close the menu after action
    }

    return (
        <div className="editor-container">
            <button onClick={handleEdit}>
                <EditIcon label=""/>
            </button>
            <button onClick={handleShare}>
                <ShareIcon label=""/>
            </button>
            {showShareMenu && (
                <div className="share-menu">
                    <button onClick={handleShareToGroup}>Share to Group</button>
                    <button onClick={handleCopyLink}>Copy Link</button>
                </div>
            )}
            <div className="editor-title-author">
                <h1 className="h1-style-input">{recipeData.title}</h1>
                <text className="editor-author">@{recipeData.author}</text>
            </div>
            <div className="editor-categories">
                {recipeData.categories.map((category, index) => (
                    <span key={index} className="category-chip">{category}</span>
                ))}
            </div>
            <text className="viewer-content">{recipeData.article}</text>
        </div>
    );
};

export default RecipeViewer;
