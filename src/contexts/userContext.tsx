import { createContext } from "react";

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
    liked: boolean;
    disliked: boolean;
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
    likes: [];
    dislikes: [];
    pending: boolean;
    error: boolean;
    status: string;
    _id: string;
}

type UserContextType = {
    profile?: ProfileType | null;
    setProfile?: (p: ProfileType | null) => void;
    recipes?: RecipeType[] | [];
    setRecipes?: (r: RecipeType[] | []) => void;
}

const UserContext = createContext<UserContextType>({ profile: null, recipes: [] });

export default UserContext;