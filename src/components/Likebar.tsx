// @ts-nocheck

import './Likebar.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../contexts/userContext';

// TODO : maybe check if liked or disliked for calling the backend
export default function Likebar({ recipeId, liked, disliked }: { recipeId: string, liked: boolean, disliked: string }) {

    const { recipes, setRecipes } = useContext(UserContext);

    const like = async () => {
        
        let res = await axios.patch(`${import.meta.env.VITE_REMOTE_API}/account/like`, 
            { recipe_id: recipeId }, 
            { headers : { 'auth-token': localStorage.getItem('mmmm-jwt') } }
        )

        if (res.status != 200)
            return;

        const newRecipes = recipes?.map((recipe) => {
            if (recipe._id != recipeId)
                return recipe;
            return { ...recipe, liked: true, disliked: false};
        });

        setRecipes?.(newRecipes);
    }

    const dislike = async () => {

        let res = await axios.patch(`${import.meta.env.VITE_REMOTE_API}/account/dislike`, 
            { recipe_id: recipeId }, 
            { headers : { 'auth-token': localStorage.getItem('mmmm-jwt') } }
        )

        if (res.status != 200)
            return;

        const newRecipes = recipes?.map((recipe) => {
            if (recipe._id != recipeId)
                return recipe;
            return { ...recipe, liked: false, disliked: true};
        });

        setRecipes?.(newRecipes);
    }

    return (
        <div className="likebar">
            { liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon onClick={like} />}
            { disliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon onClick={dislike} />}
        </div>
    );
}