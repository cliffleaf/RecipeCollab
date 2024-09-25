import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import CommunityRecipeCard from "../components/CommunityRecipeCard";
import { API_BASE_URL } from '../config';
import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from 'axios';
import "../css/RecipeList.css";

type Recipe = {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
}

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false
});

const RecipeList = () => {
    // const [recipes, setRecipes] = useState([]); // State to store recipes

    // api.get<Recipe[]>(`/api/recipe/all`).then(res => console.log(res.data));
    const recipes = [
        {
            id: "",
            title: "Spaghetti Bolognese",
            author: "东街一只猫",
            imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
        },
        {
            id: "",
            title: "Spaghetti Bolognese",
            author: "东街一只猫",
            imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
        },
        {
            id: "",
            title: "Spaghetti Bolognese",
            author: "东街一只猫",
            imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
        },
        {
            id: "",
            title: "Spaghetti Bolognese",
            author: "东街一只猫",
            imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
        },
        {
            id: "",
            title: "Spaghetti Bolognese",
            author: "东街一只猫",
            imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
        },
    ]

    return (
            <div className="app-container">
                <div className="app-top-nav">
                    <TopNav/>
                </div>
                <section className="main">
                    <div className="app-side-nav">
                        <SideNav/>
                    </div>
                    <div className="app-recipe-card-container">
                        {recipes.map((recipe: Recipe) => (
                            <CommunityRecipeCard
                                id={recipe.id}
                                title={recipe.title}
                                author={recipe.author}
                                imgUrl={recipe.imageUrl}
                            />
                        ))}
                    </div>
                </section>
            </div>
    );
}

export default RecipeList;