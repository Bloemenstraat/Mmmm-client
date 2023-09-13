import { Link } from "react-router-dom";
import "./ErrorNotFound.css";

export default function ErrorNotFound() {
    return (
        <div className="notfound-body">
            <h1>404 Not found</h1>
            <h2>Or maybe you are not allowed :(</h2>
            <Link to="/">Go back to login</Link>
        </div>
    );
}