import React from 'react';
import headerStyle from './HeaderButton.module.css';
import PropTypes from 'prop-types';


function HeaderButton (props) {
        return (
            <a href="#" className={headerStyle.button}>
                {props.icon}
                <div>
                    <p className={props.type ==='primary' ? headerStyle.fontP : headerStyle.fontS}>{props.text}</p>
                </div>
            </a>
        );
}

HeaderButton.propTypes = {
    icon: PropTypes.object,
    type: PropTypes.string,
    text: PropTypes.string
};

export default HeaderButton ;