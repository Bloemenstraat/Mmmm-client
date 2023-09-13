// @ts-nocheck
import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import UserContext from "../contexts/userContext";
import { ReactComponent as GroceryIcon } from '../assets/groceries.svg';
import "./Dashboard.css";

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

// TODO : profile is null when accessing the dashboard directly

export default function Dashboard() {

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const { profile, recipes, setRecipes } = useContext(UserContext);

    useEffect(() => {

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

        <div className="dashboard-body">
            <div className="dashboard-groceries">
                <Link to="/groceries"> 
                    <div className="dashboard-groceries-link">
                        <GroceryIcon /> <span>Grocery list</span> 
                    </div>
                </Link>
            </div>
            
            <div className="dashboard-content">
                { recipes?.length != 0 
                ? 
                <div className="dashboard-cards">
                    
                    {recipes?.map((recipe: RecipeType, i: number) => <Card recipe={recipe} day={days[i]} key={recipe._id} /> ) }
                </div>
                : 
                    profile?.pending 
                    ? 
                    <h2>Cooking up some recipes... Please come back in a few minutes !</h2>
                    :
                    <h2>No recipes available. Have you tried <Link to="/chat">creating</Link> a meal plan ?</h2>
                    
                }

                { profile?.error && <h2>Your request for creating a new meal plan failed :( Why not <Link to="/create"> retry </Link> in a few minutes ?</h2>}            
            
            </div>
        </div>
    );
}