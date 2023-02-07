import React from 'react';
import headerStyle from './HeaderButton.module.css';
import PropTypes from 'prop-types';


class HeaderButton extends React.Component {
    render() {
        return (
            <a href="#" className={headerStyle.button}>

                {this.props.icon}
                <div>
                    <p className={this.props.type ==='primary' ? headerStyle.fontP : headerStyle.fontS}>{this.props.text}</p>
                </div>

            </a>
        );
    }
}

HeaderButton.propTypes = {
    icon: PropTypes.object,
    type: PropTypes.string,
    text: PropTypes.string
};

export default HeaderButton ;