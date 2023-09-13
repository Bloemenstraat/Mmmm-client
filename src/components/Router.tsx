import { createBrowserRouter } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import CreatePlan from "../pages/CreatePlan";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignInScreen from "../pages/SignInScreen";
import Root from "./Root";
import { loader as recipeLoader, Recipe } from "../pages/Recipe";
import Chat from "../pages/Chat";
import ErrorNotFound from "../pages/ErrorNotFound";
import ErrorLoggedIn from "../pages/ErrorLoggedIn";
import ProtectedRoute from "./ProtectedRoute";
import LoggedinRoute from "./LoggedinRoute";
import Subscribe from "../pages/Subscribe";
import Onboarding from "../pages/Onboarding";
import Groceries from "../pages/Groceries";
import Upgrade from "../pages/Upgrade";
import Success from "../pages/Success";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorNotFound />,
        children:[
            {
                path: 'signin',
                element: <LoggedinRoute component={SignIn} /> //useLoginRoute(SignIn)
            }
            ,
            {
                path: '/',
                element: <LoggedinRoute component={SignInScreen} /> //useLoginRoute(SignInScreen) //<SignInScreen />
            }
            ,
            {
                path: 'register',
                element: <LoggedinRoute component={CreateAccount} /> //useLoginRoute(CreateAccount)
            }
            ,
            {
                path: 'create',
                element: <ProtectedRoute component={CreatePlan} />, //useProtectedRoute(CreatePlan), 
            }
            ,
            {
                path: 'dashboard',
                element: <ProtectedRoute component={Dashboard} /> //useProtectedRoute(Dashboard),
            }
            ,
            {
                path: 'recipe/:recipeId',
                element: <Recipe />,
                loader: async({ params }) => recipeLoader(params),
            }
            ,
            {
                path: 'chat',
                element: <ProtectedRoute component={Chat} /> //useProtectedRoute(Chat),
            }
            ,
            {
                path: 'logerror',
                element: <ProtectedRoute component={ErrorLoggedIn} /> //useProtectedRoute(ErrorLoggedIn),
            }
            ,
            {
                path: 'subscribe',
                element: <Subscribe /> //useProtectedRoute(ErrorLoggedIn),
            }
            /*,
            {
                path: 'onboarding',
                element: <Onboarding /> //useProtectedRoute(Onboarding),
            }*/
            ,
            {
                path: 'groceries',
                element: <Groceries /> //useProtectedRoute(ErrorLoggedIn),
            }
            ,
            {
                path: 'upgrade',
                element: <Upgrade />,
            }
            ,
            {
                path: 'success',
                element: <Success />,
            }

        ]
    },
    {
      path: 'onboarding',
      element: <ProtectedRoute component={Onboarding} />,
    },
    
]);

export default router;