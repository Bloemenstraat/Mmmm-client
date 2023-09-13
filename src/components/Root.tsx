// @ts-nocheck
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';
import axios from "axios";
import UserContext from "../contexts/userContext";
import { useEffect, useState } from "react";

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

export default function Root() {
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [recipes, setRecipes] = useState<RecipeType[] | []>([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REMOTE_API}/auth/info`, {
            headers: {'auth-token': localStorage.getItem('mmmm-jwt')}
        })
        .then((res) => {
            setProfile(res.data);
        })        
    }, []);
    
    return (
        <>
            <UserContext.Provider value={{ profile, setProfile, recipes, setRecipes }}>
                <Navbar />
                <Outlet />
            </UserContext.Provider>
        </>
    )
}