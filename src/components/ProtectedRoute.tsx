import { Navigate } from "react-router-dom";

//const ProtectedRoute = ({component: Component, ...rest}) => {
const ProtectedRoute = ({component: Component, ...rest}: any) => {
    const token = localStorage.getItem('mmmm-jwt');

    return (
        token ? <Component {...rest} /> : <Navigate to="/error" />
    );
}
 

export default ProtectedRoute;