import React from 'react';
import { Logo, BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from "./HeaderButton/HeaderButton";
import  s from "./AppHeader.module.css"

class AppHeader extends React.Component {
    render() {
        return (
            <header className={s.header}>
                <div className={s.center}>
                    <nav className={s.nav + " mt-4"}>

                        <div className={s.container}>
                            <div className={"mr-1"}>
                                <HeaderButton icon={<BurgerIcon type="primary" />} text = "Конструктор" type="primary"/>
                            </div>
                            <div className={"ml-1"}>
                                <HeaderButton icon={<ListIcon type="secondary" />} text = "Лента заказов" type="secondary"/>
                            </div>
                        </div>
                        <div className={s.logo}>
                            <Logo/>
                        </div>
                        <div className={s.profile}>
                            <HeaderButton icon={<ProfileIcon type="secondary" />} text = "Личный кабинет" type="secondary" />
                        </div>

                    </nav>
                </div>
            </header>
        );
    }
}

export default AppHeader;