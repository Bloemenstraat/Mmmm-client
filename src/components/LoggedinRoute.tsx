import { Navigate } from "react-router-dom";

const LoggedinRoute = ({component: Component, ...rest}: any) => {
    const token = localStorage.getItem('mmmm-jwt');

    return (
        token ? <Navigate to="/logerror" /> : <Component {...rest} />  
    );
}
 

export default LoggedinRoute;