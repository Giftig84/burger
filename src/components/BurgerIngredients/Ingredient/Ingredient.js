import React from 'react';
import { Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './Ingredient.module.css'
import PropTypes from 'prop-types';

function Ingredients (props) {

        return(
            <div className={s.main}>
               <div>
                   {props.count > 0 &&
                       <div className={s.counter}>
                           <Counter count={props.count} size="default" />
                       </div>
                   }
               </div>

                <img  alt={props.title}    src={props.image}  />
                <div className = {s.price + " mt-1"}>
                    <p className={"mr-1 text text_type_main-medium"}> {props.price}</p>
                    <CurrencyIcon/>
                </div>
                <div className={s.desc + " mt-1"}>
                    <p className={"mt-1"}>{props.desc}</p>
                </div>

            </div>
        )

}
Ingredients.propTypes = {
        count: PropTypes.number,
        price: PropTypes.number,
        title: PropTypes.string,
        desc: PropTypes.string,
        image: PropTypes.string

}
export  default Ingredients ;