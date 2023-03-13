import React from 'react';
import headerStyle from './HeaderButton.module.css';
import PropTypes from 'prop-types';
import {NavLink, useLocation} from "react-router-dom";


function HeaderButton(props) {
    const location = useLocation();
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

HeaderButton.propTypes = {
    icon: PropTypes.object,
    type: PropTypes.string,
    text: PropTypes.string
};