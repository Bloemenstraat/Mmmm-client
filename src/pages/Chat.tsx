// @ts-nocheck
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import UserContext from '../contexts/userContext';
import './Chat.css';

interface MessageType {
    role: string;
    content: string;
}

export default function Chat () {

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [preferencing, ] = useState(false);
    // const { profile } = useContext(UserContext);
    const navigate = useNavigate();

    
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter' && !loading)
            sendMessage();
    }

    const sendMessage = async () => {

        if (inputMessage.length < 2 || inputMessage.length > 200)
            return

        setLoading(true);
        // FIX: There is a small timing problem when updating the message
        let oldMessages = messages;

        setMessages([ ...messages, {role: 'user', content: inputMessage} ]);
        setInputMessage('');

        let chatData;

        try {

            let res = await axios.post(`${import.meta.env.VITE_REMOTE_API}/bot/chat`, [ ...messages, {role: 'user', content: inputMessage} ], {
                headers: { "auth-token": localStorage.getItem('mmmm-jwt') }
            });
            chatData = res.data;

        } catch (e: any) {
            if (!e.response)
                chatData = 'Impossible to contact our Chef Bot due to internet issues. :(' 

            if (e.response.status == 401)
                chatData = 'Sorry, your free trial has expired. :('                 
        }
          
        await new Promise(r => setTimeout(r, 1000));

        setMessages([ ...oldMessages, {role: 'user', content: inputMessage}, {role: 'assistant', content: chatData} ]);

        setLoading(false);

    };

    const updatePreferences = async () => {

        try {
            await axios.post(`${import.meta.env.VITE_REMOTE_API}/account/save-chat`, messages, {
                headers: { 'auth-token' : localStorage.getItem('mmmm-jwt')}
            })

            await axios.get(`${import.meta.env.VITE_REMOTE_API}/bot/chef`, {
                headers: { 'auth-token' : localStorage.getItem('mmmm-jwt')}
            })
        } catch (e: any) {
            
            if (!e.response) 
                return;

            if (e.response.status == 401)
                return navigate('/upgrade');               
        }

        navigate('/dashboard');
    };

    useEffect(() => {
        setLoading(true);

        axios.get(`${import.meta.env.VITE_REMOTE_API}/account/chat`, 
            { headers: { "auth-token": localStorage.getItem('mmmm-jwt') } }
        )
        .then((res) => {
            setMessages(res.data);
            setLoading(false);
        })
        .catch(() => setLoading(false));

    }, []);

    return (
        <div className="chat-body">
            <div className="chat-content">
                <div className="chat-message-area">
                    { messages.map((message, i) => {
                        if (message.role == "system")
                            return
                        return <p key={i} className={message.role}>{message.content}</p>
                    } ) }                 
                </div>

                <div className="chat-done">
                    <Button type="crimson" state={preferencing ? "disabled" : ""} onClick={updatePreferences} >Done !</Button>
                </div>

                <div className="chat-input-area">
                    <input placeholder='Message...' onChange={e => setInputMessage(e.target.value)} onKeyDown={handleEnter} value={ inputMessage } />
                    <Button type="crimson" state={loading ? "loading" : ""} onClick={sendMessage}>Send</Button>
                </div>
            </div>
        </div>
    );
}