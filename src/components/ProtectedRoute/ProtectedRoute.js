import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../services/selectors/selectors";
import { Navigate } from "react-router-dom";
import { useEffect} from 'react';
import {getUser} from "../../services/actions/userAction";

export const ProtectedRoute = ({ element }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(authSelector);

    useEffect(() => {
        dispatch(getUser());
    }, []);


    return isAuth ? element : <Navigate to="/login" />;
}