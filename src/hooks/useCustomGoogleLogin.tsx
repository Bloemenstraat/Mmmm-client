import { googleLogout, TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function useCustomGoogleLogin() {
    const navigate = useNavigate();

    const getToken = async (codeResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
        let res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,  {
            headers: {
                Authorization: `Bearer ${codeResponse.access_token}`,
                Accept: 'application/json'
            }
        })
        
        res = await axios.post(`${import.meta.env.VITE_REMOTE_API}/auth/google/register`, res.data);
        
        if (res.status == 200) {
            localStorage.setItem('mmmm-jwt', res.headers['auth-token']);

            if (Object.keys(res.data).length == 0)
                navigate('/chat');
            else
                navigate('/onboarding')
        }
    }

    const Glogin = useGoogleLogin({
        onSuccess: (codeResponse) => getToken(codeResponse),
        onError: (error) => console.log(`Login failed: ${error}`)
    });

    const Glogout = () => {
        googleLogout();
    };

    return { Glogin, Glogout };

}

