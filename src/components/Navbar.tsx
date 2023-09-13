import { Avatar } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from '../contexts/userContext';
import './Navbar.css';

export default function Navbar() {
    const token = localStorage.getItem('mmmm-jwt');
    const [ , setAuthenticated ] = useState(token ? true : false);
    const { profile, setProfile } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('mmmm-jwt');
        setAuthenticated(false);
        setProfile?.(null);
        navigate('/');
    };

    const manage = async () => {
        try {
            let url = await axios.get(`${import.meta.env.VITE_REMOTE_API}/account/manage-subscription`, {
                headers: { 'auth-token' : localStorage.getItem('mmmm-jwt')}
            });
            window.location.href = url.data;
        } catch (e: any) {
            console.log(e.message)
        }
    }

    if (!profile && localStorage.getItem('mmmm-jwt')) {
        axios.get(`${import.meta.env.VITE_REMOTE_API}/auth/info`, {
            headers: {'auth-token': localStorage.getItem('mmmm-jwt')}
        })
        .then((res) => {
            setProfile?.(res.data);
        })  
    }


    return (
        <div className="navbar">
            <div className="navbar-content">
                { profile ? <p> Welcome, {profile?.name}</p> : <p>Mmmm.</p> }
                { profile
                ?
                <div className="userbar">
                    {profile?.status == 'subscribed' && <a onClick={manage}>Manage subscription</a>}
                    {profile?.status != 'subscribed' && <Link to="/upgrade">Upgrade</Link>}
                    <Link to="chat">New dinner plan</Link>
                    <a onClick={logout}>Log out</a>
                    <Link to="/dashboard">
                        <Avatar alt="User avatar" src={profile?.picture} />
                    </Link>
                </div>
                :
                <div> 
                    <NavLink to='signin'>Sign in. </NavLink>
                    <span>No account yet? </span>
                    <NavLink to='register'>Register! </NavLink>
                </div>
                }
            </div>
        </div>
    );
}