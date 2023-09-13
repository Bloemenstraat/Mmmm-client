import TextField from '@mui/material/TextField';
import Button from '../components/Button';
import useCustomGoogleLogin from '../hooks/useCustomGoogleLogin';
import "./SignIn.css";
import "../App.css";
import useSimpleLogin from '../hooks/useSimpleLogin';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup.object({
    email: yup.string().email('Invalid email format').required('Please enter an email.'),
    password: yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number').min(5, 'Minimum 5 characters').max(15, 'Maximum 15 characters').required('Please enter a password'),
}).required()



type FormData = {
    email: string; 
    password: string
};

export default function SignIn () {

    const { register, setError, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });

    const { Glogin } = useCustomGoogleLogin();
    const { simpleLogin } = useSimpleLogin();

    const onSubmit = async (data: FormData) => {
        const noAccount = await simpleLogin(data.email, data.password);

        if (noAccount) {
            setError("email", { type: "custom", message: "Email and password not matching." });
        }
    }

    return (
        <div className="signin-content">
            <div className="form-section">
                <div className="form-content">
                    <h1>Welcome back</h1>
                    <Button onClick={Glogin}>Continue with Google</Button>

                    <div className="or">
                        <span>Or</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField variant="standard" label="Email" helperText={errors.email?.message} error={errors.email ? true : false} {...register("email")} />
                        <TextField variant="standard" label="Password" type="password" helperText={errors.password?.message} error={errors.password ? true : false} {...register("password")} />

                        <div className="confirmation">
                            <Button type="red">Sign in</Button>
                            <p>Not a member? <Link to="/register">Create an account</Link> </p>
                        </div>
                    </form>

                </div>
            </div>

            <div className="splash">
                <h1>Romaine calm. Help is on the way.</h1>
            </div>
        </div>
    )
}