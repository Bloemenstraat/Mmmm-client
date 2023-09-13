import { Navigate } from "react-router-dom";

export default function useProtectedRoute(Component: React.FC) {
    //const token = localStorage.getItem('mmmm-jwt');
    /*const { profile } = useContext(UserContext);
    console.log(profile)*/


    return (
        localStorage.getItem('mmmm-jwt') ? <Component /> : <Navigate to="/error" />
    );

}