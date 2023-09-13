// @ts-nocheck
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserContext from '../contexts/userContext';
import './Groceries.css';

export default function Groceries() {

    const { recipes } = useContext(UserContext);
    let ingredients = recipes?.map((recipe) => recipe.ingredients).flat();
    ingredients = ingredients?.map((ingredient) => ingredient.name);
    ingredients = [...new Set(ingredients)];

    console.log(ingredients)
    
    return (
        <div className="groceries-body">

            <div className="groceries-back">
                <Link to="/dashboard">
                    <div className="back">
                        <ArrowBackIcon /> <span>Back</span>
                    </div>
                </Link>
            </div>

            <div className="groceries-content">                

                <h3>Grocery list</h3>

                <div className="groceries-list">
                    {ingredients?.map((ingredient) => <p>{ ingredient }</p>)}
                </div>

                
            </div>

        </div>
    );
}