import { Navigate } from "react-router-dom";

export default function useLoginRoute (Component: React.FC) {

    return (
        localStorage.getItem('mmmm-jwt') ? <Navigate to="/logerror" /> : <Component />  
    );
}