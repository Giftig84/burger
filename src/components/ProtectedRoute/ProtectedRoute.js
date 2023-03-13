import {useSelector} from "react-redux";
import {authSelector} from "../../services/selectors/selectors";
import {Navigate, useLocation} from "react-router-dom";

export const ProtectedRoute = ({ element, onlyUnAuth = false }) => {
    let isAuth = useSelector(authSelector);
    const location = useLocation();
    const from = location.state?.from || '/';

    if( isAuth && onlyUnAuth)
        return (
            <Navigate to={from} />
        )

    if( !isAuth && !onlyUnAuth)
        return (
            <Navigate to="/login" state ={{"from": location}}/>
        )

    return  element ;
}