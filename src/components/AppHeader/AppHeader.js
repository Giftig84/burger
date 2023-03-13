import React from 'react';
import { Logo, BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from "./HeaderButton/HeaderButton";
import  s from "./AppHeader.module.css"
import {NavLink, useLocation} from "react-router-dom";

function AppHeader () {
    const location = useLocation();
        return (
            <header className={s.header}>
                <div className={s.center}>
                    <nav className={s.nav + " mt-4"}>

                        <div className={s.container}>
                            <div className={"mr-1"}>
                                <HeaderButton icon={<BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />} link = '/' text = "Конструктор" type={location.pathname === '/' ? 'primary' : 'secondary'}/>
                            </div>
                            <div className={"ml-1"}>
                                <HeaderButton icon={<ListIcon type={location.pathname === 'profile/orders' ? 'primary' : 'secondary'}/>} link = '/profile/orders' text = "Лента заказов" type={location.pathname === 'profile/orders' ? 'primary' : 'secondary'}/>
                            </div>
                        </div>
                        <div className={s.logo}>
                            <NavLink to="/">
                                <Logo/>
                            </NavLink>

                        </div>
                        <div className={s.profile}>
                            <HeaderButton icon={<ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'}/> } link = '/profile' text = "Личный кабинет" type={location.pathname === '/profile' ? 'primary' : 'secondary'}/>
                        </div>

                    </nav>
                </div>
            </header>
        );

}

export default AppHeader;