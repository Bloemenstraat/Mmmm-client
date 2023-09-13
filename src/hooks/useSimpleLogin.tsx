import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useSimpleLogin() {

    const navigate = useNavigate();

    const simpleRegister = async (email: string, password: string) => {

        let data = { name: 'Stranger', email: email, password: password};

        try {
            let res = await axios.post(`${import.meta.env.VITE_REMOTE_API}/auth/register`, data);
            if (res.status != 200)
                return true;
                
        } catch (e) {
            return true;
        }
    }

    const simpleLogin = async (email: string, password: string) => {

        let data = { email: email, password: password};

        try {
            let res = await axios.post(`${import.meta.env.VITE_REMOTE_API}/auth/login`, data);

            if (res.status != 200)
                return true;

            localStorage.setItem('mmmm-jwt', res.headers['auth-token']);

            if (Object.keys(res.data).length == 0)
                navigate('/chat');
            else
                navigate('/onboarding')
        } catch (e) {
            return true;
        }
        

    };

    const simpleLogout = async () => {

    };

    return { simpleRegister, simpleLogin, simpleLogout };

}