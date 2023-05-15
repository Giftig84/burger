import React, {FC} from 'react';
import s from './ProfileNavigation.module.css';
import { NavLink, useLocation, useNavigate} from "react-router-dom";
import {userLogout} from "../../services/actions/userAction";
import { useAppDispatch} from "../../Types/types";
type TProps = { description?: string;}
export const ProfileNavigation:FC<TProps> = (props) =>{
    let location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logOut = ()=>{
        dispatch(userLogout());
        navigate('/login');
    }

    return (
        <div className={s.main +" mt-20 mr-15"}>
            <NavLink to={'/profile'}  className={ (location.pathname ==="/profile" ? s.link_active_url : s.link) + " text text_type_main-medium text_color_inactive"}
                     >Профиль</NavLink>
            <NavLink to={'/profile/orders'}  className={(location.pathname ==="/profile/orders" ? s.link_active_url : s.link) + " text text_type_main-medium text_color_inactive"}
                     >История заказов</NavLink>
            <div onClick={logOut}
                     className={s.link + " text text_type_main-medium text_color_inactive"}>Выход</div>
            <p className={"text text_type_main-default text_color_inactive mt-20"}>{props.description}</p>
        </div>
    )

}