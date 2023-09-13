// @ts-nocheck
import { useContext, useEffect } from "react";
import { Link, Params, useLoaderData } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserContext from "../contexts/userContext";
import './Recipe.css';
import Likebar from "../components/Likebar";
import axios from "axios";

type RecipeType = {
    _id: string;
    name: string;
    picture: string;
    difficulty: string;
    duration: string;
    calories: number;
    type: string;
    rating: number;
    instructions: string[];
    ingredients: string;
};

export async function loader( params: Params<string>) {
    const recipeId = params.recipeId;
    return recipeId;
}

export function Recipe () {
    
    const recipeId = useLoaderData() as string;
    const { recipes, setRecipes, profile } = useContext(UserContext);
    const recipe = recipes?.find((recipe: RecipeType) => recipe._id == recipeId);

    useEffect(() => {
        console.log(recipes)
        if (recipes?.length != 0)
            return;

            axios.get(`${import.meta.env.VITE_REMOTE_API}/bot/mealplan`, { headers : { 'auth-token': localStorage.getItem('mmmm-jwt') } })
            .then( (res) => {
                const likebarRecipes = res.data.map((e: RecipeType) => {
                    return {
                        ...e,
                        'liked': profile?.likes.includes(e?._id), 
                        'disliked': profile?.dislikes.includes(e?._id)
                    }
                });
                setRecipes?.(likebarRecipes);
            })
            .catch( err => console.log(err));            
        
    }, []);

    return (
        <div className="recipe-body">
            <div className="recipe-content">

            <div className="recipe-illustration">

                <Link to="/dashboard">
                    <div className="back">
                        <ArrowBackIcon /> <span>Back</span>
                    </div>
                </Link>

                <h3>{ recipe?.name }</h3>

                <div className="recipe-info">
                    <h5>{ recipe?.difficulty }</h5>
                    <div className="dot"></div>
                    <h5>{ recipe?.type }</h5>
                    <div className="dot"></div>
                    <h5>{ recipe?.duration } min</h5>     
                </div>

                <img src={ `${import.meta.env.VITE_REMOTE_API}/${recipe?.picture}` } alt="recipe" />

                <Likebar recipeId={recipe?._id} liked={recipe?.liked} disliked={recipe?.disliked} />               

                <div className="recipe-ingredients">
                    { recipe?.ingredients.map((ingredient) => {
                        return (<div className="ingredient">{ ingredient.name }</div>);

                    } ) }
                </div>
            </div>

            <div className="recipe-instructions">      
                <ul>
                    { recipe?.instructions.map((step: string, i: number) => {
                        return <li><p className="step">Step {i+1}</p> <p> { step } </p></li>
                    })}
                </ul>
            </div>

            

            </div>

        </div>
    );
}