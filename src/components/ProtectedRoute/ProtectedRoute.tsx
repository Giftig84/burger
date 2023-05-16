import React, {FC, ReactFragment} from 'react';
import {authSelector, isLoadingUserSelector} from "../../services/selectors/selectors";
import {Navigate, useLocation, RouteProps, Location} from "react-router-dom";
import {useAppSelector} from "../../Types/types";
import ClipLoader from "react-spinners/ClipLoader";
import s from "../App/app.module.css";

type TProps = {   onlyUnAuth?: boolean;
    element?: ReactFragment | React.ComponentType | any;
    background?: Location | null;
} & RouteProps;

export const ProtectedRoute: FC<TProps> = ({ element, onlyUnAuth = false, background = null }) => {
    let isAuth = useAppSelector(authSelector);
    let isLoadingUser = useAppSelector(isLoadingUserSelector);
    const location = useLocation();
    const from = location.state?.from  || '/';

    debugger;
    if(background && !isAuth) return null;
    /*if(isLoadingUser) return (
        <ClipLoader className={s.loader}
                    color="#4C4CFF"
                    loading={isLoadingUser}
                    size={250}
                    aria-label="Loading Spinner"
                    data-testid="loader"
        />
    )*/

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

