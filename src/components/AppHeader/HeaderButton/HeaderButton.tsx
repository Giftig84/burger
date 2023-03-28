import React, {ReactElement, FC} from 'react';
import headerStyle from './HeaderButton.module.css';
import {NavLink} from "react-router-dom";

type THeaderButton = {
    icon: ReactElement,
    type: string,
    text: string,
    link: string
}
const HeaderButton: FC<THeaderButton> = (props) =>{
    return (
        <NavLink to={props.link} className={headerStyle.button}>
            {props.icon}
            <div>
                <p className={props.type === 'primary' ? headerStyle.fontP : headerStyle.fontS}>{props.text}</p>
            </div>
        </NavLink>

    );
}
export default HeaderButton;

