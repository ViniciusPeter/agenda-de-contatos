import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useMyContext } from "./hooks/useMyContext";
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function ProtectRoutes({ redirectTo }){
    const { user } = useMyContext()

    return user.token ? <Outlet /> : <Navigate to={redirectTo} />
}


function MyRoutes(){
    return(
        <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route path='/sign-up' element={<SignUp />} />

            <Route element={<ProtectRoutes redirectTo={'/'}/>}>
                <Route path='/main' element={<Main />} />    
            </Route>
        </Routes>
    );
}

export default MyRoutes;
