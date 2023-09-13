import { Link } from "react-router-dom";
import "./ErrorLoggedIn.css";

export default function ErrorLoggedIn () {
    return (
        <div className="loggedin-body">
            <h2>You are already logged in !</h2>
            <h2>You should check your <Link to="/dashboard">dashboard</Link> !</h2>
            <h2>Or maybe <Link to="/chat">create a meal plan</Link> !</h2>            
        </div>
    );
}