import { useLocation, Navigate, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
import Navbar from "../Navbar/Navbar";

const PrivateRoutes = ({ path, ...props }) => {
    const location = useLocation()
    const { isLoggedIn } = useSelector((state) => state.auth)
    return isLoggedIn ? (
        <>
            <Navbar />
            <Route exact {...props} path={path} />
        </>
    ) : (
        <Navigate state={{ from: location.pathname }} replace to='/login' />
    );

}
export default PrivateRoutes

{/* <Navigate state={{ from: location.pathname }} replace to='/login' /> */ }