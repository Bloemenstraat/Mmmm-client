import { CircularProgress } from "@mui/material";
import "./Button.css";

type ButtonStyles = "standard" | "golden" | "red" | "crimson";
type ButtonStates = "disabled" | "loading" | "";

type ButtonTypes = {
    type?: ButtonStyles;
    state?: ButtonStates;
    onClick?: () => void;
    children: React.ReactNode;
};

export default function Button({type = "standard", state, onClick, children}: ButtonTypes) {
    return (
        <>
            <button className={`${type} ${state}`} onClick={onClick}>
                <div className="button-content">
                    { state == "loading" ? <CircularProgress size={'1em'} /> : <></> }
                    <span>{children}</span>
                </div>
            </button>
        </>
    )
}