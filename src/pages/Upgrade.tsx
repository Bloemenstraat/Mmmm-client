// @ts-nocheck
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upgrade.css';

export default function Upgrade() {

    const [ subscribed, setSubscribed ] = useState(false);

    const upgrade = async () => {

        try {
            let url = await axios.post(`${import.meta.env.VITE_REMOTE_API}/account/subscribe`, {ingredients: 'dgdfgdf'}, {
                headers: { 'auth-token' : localStorage.getItem('mmmm-jwt')}
            });
            window.location.href = url.data;
        } catch (e) {
            setSubscribed(true);
        }
        

        
    }

    return (
        <div className="upgrade-body">
            <div className="upgrade-content">
                <h1>No more kitchen nightmares</h1>

                <p>
                    Let’s go Gordon on your dinner plans. (except on the tele) 
                    Get dinner plans that, with time becomes even smarter and knows 
                    what your cravings are. Before you even know
                </p>

                <h6 onClick={upgrade}>$5/month</h6>

                { subscribed && <p>You are already subscribed !</p>}
            </div>
        </div>
    )
}