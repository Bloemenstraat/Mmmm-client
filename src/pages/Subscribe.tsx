import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Subscribe.css';

export default function Subscribe() {

    const navigate = useNavigate();

    const subscribe = async () => {
        let url = await axios.post(`${import.meta.env.VITE_REMOTE_API}/account/subscribe`, {ingredients: 'dgdfgdf'}, {
            headers: { 'auth-token' : localStorage.getItem('mmmm-jwt')}
        })

        navigate(url.data)
    }

    return (
        <div className="subscribe-body">
            <button onClick={subscribe}>Glouglou</button>
        </div>
    );
}