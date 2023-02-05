import React from 'react';
import { Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './Ingredient.module.css'
import PropTypes from 'prop-types';

class Ingredients extends  React.Component {
    render () {
        return(
            <div className={s.main}>
               <div>
                   {this.props.count > 0 &&
                       <div className={s.counter}>
                           <Counter count={this.props.count} size="default" />
                       </div>
                   }
               </div>

                <img  alt={this.props.title}    src={this.props.image}  />
                <div className = {s.price + " mt-1"}>
                    <p className={"mr-1 text text_type_main-medium"}> {this.props.price}</p>
                    <CurrencyIcon/>
                </div>
                <div className={s.desc + " mt-1"}>
                    <p className={"mt-1"}>{this.props.desc}</p>
                </div>

            </div>
        )
    }
};
Ingredients.propTypes = {
        count: PropTypes.number,
        price: PropTypes.number,
        title: PropTypes.string,
        desc: PropTypes.string,
        image: PropTypes.string

}
export  default Ingredients ;