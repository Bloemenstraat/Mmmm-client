// @ts-nocheck

import { useNavigate } from 'react-router-dom';
import "./Card.css";
import Likebar from './Likebar';

type RecipeType = {
    _id: string;
    name: string;
    picture: string;
    difficulty: string;
    duration: string;
    calories: number;
    type: string;
    rating: number;
    liked: boolean;
    disliked: boolean;
    instructions: string[];
    ingredients: string;
};

export default function Card( { recipe, day }: {recipe: RecipeType, day: string} ) {

    const navigate = useNavigate();

    const onCardClick = () => navigate(`/recipe/${recipe._id}`); 

   return (
        <div className="card-body">

            <h6>{ day }</h6>

            <h3 onClick={onCardClick} >{ recipe.name }</h3>

            <div className="card-info">
                <h5>{ recipe.difficulty }</h5>
                <div className="dot"></div>
                <h5>{ recipe.type }</h5>
                <div className="dot"></div>
                <h5>{ recipe.duration } min</h5>     
            </div>

            <div className="card-picture" onClick={onCardClick} style={{ backgroundImage: `url(${import.meta.env.VITE_REMOTE_API}${recipe.picture})`}}>
            </div>



            <div className="card-actions">
                <Likebar recipeId={recipe._id} liked={recipe.liked} disliked={recipe.disliked} />               

            </div>
            

            

        </div>
    );
}