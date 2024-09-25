import TopNav from "../components/TopNav";
import RecipeCard from "../components/RecipeCard";
import SideNav from "../components/SideNav";
import { API_BASE_URL } from '../config';
import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from 'axios';

type Recipe = {
    id: string;
    title: string;
    author: string;
    imageUrl?: string | null;
    content?: string;
    categories?: string[];
}

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false
});

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]); // State to store recipes

    api.get<Recipe[]>(`/api/recipe/all`).then(res => console.log(res.data));

    return (
        <>
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
                            <RecipeCard
                                id={recipe.id}
                                title={recipe.title}
                                author={recipe.author}
                                imgUrl="null"
                                community=""
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default RecipeList;