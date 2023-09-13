import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useCustomGoogleLogin from "../hooks/useCustomGoogleLogin";
import "./SignInScreen.css";

export default function SignInScreen() {

    const navigate = useNavigate();
    const { Glogin } = useCustomGoogleLogin();

    const onClick = (link: string) => navigate(link);

    return (
        <div className="signscreen-body">
        <div className="signscreen-content">
            <h2>Let's swine & dine</h2>
            <div className="signin-buttons">

                <div className="signin-methods">
                    <Button onClick={Glogin}>Continue with Google</Button>
                    <Button>Continue with Apple</Button>
                    <Button onClick={() => onClick('/register')}>Sign up with email</Button>
                </div>

                <Button type="golden" onClick={() => onClick('/signin')}>Log in</Button>
            </div>
        </div>
        </div>
    )

}