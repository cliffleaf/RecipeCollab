import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ItemCard.css';

interface RecipeCardProps {
  id: string;
  title: string;
  author: string;
  imgUrl: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, author, imgUrl }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipes/${id}`}>
        <img src={imgUrl} alt={title} className="recipe-image" />
        <div className="recipe-info">
          <h3>{title}</h3>
          <p>By {author}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
