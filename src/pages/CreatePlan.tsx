// @ts-nocheck
import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import UserContext from "../contexts/userContext";
import "./CreatePlan.css"

type PreferencesType = {
    language: string;
    allergies: string;
    diet: string;
};

type ProfileType = {
    email: string;
    googleID: string;
    mealPlan: string[];
    name: string;
    picture: string;
    preferences: PreferencesType;
    pending: boolean;
    error: boolean;
    _id: string;
}

export default function CreatePlan () {

    const [ingredients, setIngredients] = useState('');
    const [loading, setLoading] = useState(false);
    const { profile, setProfile } = useContext(UserContext);

    const createPlan = async () => {
        setLoading(true);

        await axios.post(`${import.meta.env.VITE_REMOTE_API}/bot/chef`, {ingredients: ingredients}, {
            headers: { 'auth-token' : localStorage.getItem('mmmm-jwt')}
        })

        console.log({ ...profile, pending: true })

        setProfile?.({ ...profile, pending: true } as ProfileType);
        setLoading(false);
    }

    return (
        <div className="plan-body">
            <div className="plan-section">
                <h1>CREATE A NEW DINNER PLAN</h1>

                <p>What do you got at home?</p>
                <input type="text" onChange={(e) => setIngredients(e.target.value)}/>

                <p>What's your weekly budget?</p>
                <input type="text" />

                {profile?.pending && <p>Creating plan, this may take several minutes... Please check your <Link to="/dashboard">dashboard.</Link> </p> }

                <Button type="crimson" state={ (loading || profile?.pending) ? "loading" : ""} onClick={createPlan}>Next</Button>
                
            </div>
        </div>
    );
}