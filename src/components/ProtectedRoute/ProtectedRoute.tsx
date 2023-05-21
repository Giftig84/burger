import React, {FC, ReactFragment} from 'react';
import {authSelector, isCheckedUserSelector} from "../../services/selectors/selectors";
import {Navigate, useLocation, RouteProps, Location} from "react-router-dom";
import {useAppSelector} from "../../Types/types";


type TProps = {   onlyUnAuth?: boolean;
    element?: ReactFragment | React.ComponentType | any;
    background?: Location | null;
} & RouteProps;

export const ProtectedRoute: FC<TProps> = ({ element, onlyUnAuth = false, background = null }) => {
    let isAuth = useAppSelector(authSelector);
    let isCheckedUser = useAppSelector(isCheckedUserSelector);
    const location = useLocation();
    const from = location.state?.from  || '/';


    if(background && !isAuth) return null;

    if( isAuth && onlyUnAuth)
        return (
            <Navigate to={from} />
        )

    if( !isAuth && !onlyUnAuth && isCheckedUser){
        return (
            <Navigate to="/login" state ={{"from": location}}/>
        )
    }
    return  element ;
}

