import { Link } from 'react-router-dom';
import './Success.css';

export default function Success() {
    return (
        <div className="success-body">
            <div className="success-content">

                <h1>You are now subscribed to our service !</h1>

                <p>Feel free to chat with our <Link to="/chat"> virtual chef ! </Link> </p>

            </div>
        </div>
    )
}