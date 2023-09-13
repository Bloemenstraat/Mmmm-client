// @ts-nocheck
import { TextField } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import LanguageSelect from '../components/LanguageSelect';
import UserContext from '../contexts/userContext';
import { ReactComponent as NextIcon } from '../assets/nextIcon.svg';
import './Onboarding.css';
import { useNavigate } from 'react-router-dom';

// TODO : Bigger name input 
// TODO : narrower language selection


export default function Onboarding () {

    const [ language, setLanguage ] = useState('English');
    const [ name, setName ] = useState('');
    const [ error, setError ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REMOTE_API}/auth/info`, {
            headers: {'auth-token': localStorage.getItem('mmmm-jwt')}
        })
        .then((res) => {
            setName(res.data.name);
            setLanguage(res.data.language);
        })  
    }, []);

    const onboard = async () => {

        if (name?.length < 2) {
            setError(true);
            return;
        }
        setError(false);

        const data = { 'language': language, 'name': name };

        await axios.patch(`${import.meta.env.VITE_REMOTE_API}/account/onboarding`, data, { 
            headers : { 'auth-token': localStorage.getItem('mmmm-jwt') }
        });

        navigate('/dashboard');
    };
    
    return (
        <div className="onboarding-body">
            <div className="onboarding-content">
                <div className="onboarding-settings">

                    <TextField id="standard-basic" label="What's your name ?" variant="standard" error={error} helperText="Name must be at least 3 characters." value={name} onChange={e => setName(e.target.value)} />
                    <p>What language you want your sous chef and recipes to be in.</p>
                    <LanguageSelect setLanguage={setLanguage} />

                </div>

                <NextIcon onClick={onboard} />

            </div>
        </div>

    );
}