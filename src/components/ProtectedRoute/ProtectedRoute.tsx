import React, {FC, ReactFragment} from 'react';
import {useSelector} from "react-redux";
import {authSelector} from "../../services/selectors/selectors";
import {Navigate, useLocation, RouteProps} from "react-router-dom";

type TProps = {   onlyUnAuth?: boolean;
    element?: ReactFragment | React.ComponentType | any;
} & RouteProps;

export const ProtectedRoute: FC<TProps> = ({ element, onlyUnAuth = false }) => {
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

