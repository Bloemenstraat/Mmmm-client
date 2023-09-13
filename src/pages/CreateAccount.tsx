import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import useCustomGoogleLogin from '../hooks/useCustomGoogleLogin';
import useSimpleLogin from '../hooks/useSimpleLogin';
import "./CreateAccount.css";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from 'react';

const schema = yup.object({
    email: yup.string().email('Invalid email format').required('Please enter an email.'),
    password: yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number').min(5, 'Minimum 5 characters').max(15, 'Maximum 15 characters').required('Please enter a password'),
    passwordConf: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
}).required()


type FormData = { 
    email: string;
    password: string;
    passwordConf: string;
}

export default function CreateAccount () {

    const { simpleRegister } = useSimpleLogin();
    const { Glogin } = useCustomGoogleLogin();
    const { register, setError, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });
    const [ created, setCreated] = useState(false);

    const onSubmit = async (data: FormData) => {


        const notCreated = await simpleRegister(data.email, data.password);

        if (notCreated) {
            setError("email", { type: "custom", message: "User already exists." });
        } else {
            setCreated(true);
        }
    }



    return (
        <div className="create-account-content">
            <div className="form-section">
                <div className="form-content">
                    <h1>Welcome</h1>
                    <Button onClick={Glogin}>Create with Google</Button>

                    <div className="or">
                        <span>Or</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField variant="standard" label="Email" helperText={errors.email?.message} error={errors.email ? true : false} {...register("email")} />
                        <TextField variant="standard" label="Password" type="password" helperText={errors.password?.message} error={errors.password ? true : false} {...register("password")} />
                        <TextField variant="standard" label="Password again" type="password" helperText={errors.passwordConf?.message} error={errors.passwordConf ? true : false} {...register("passwordConf")} />

                        <div className="confirmation">
                            { (!created) && <Button type="red">Try for 7 days</Button>}
                            { created && <p>Account created ! <Link to="/signin">Log in now.</Link> </p> }
                            <p>Already a member? <Link to="/signin">Sign in</Link> </p>
                        </div>
                    </form>
                </div>
            </div>

            <div className="splash">
                <h1>LETTUCE GUIDES YOU TOWARDS LESS HUNGRY DAYS</h1>
            </div>
        </div>
    )
}