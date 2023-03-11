import React from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './Ingredient.module.css'
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";


function Ingredient(props) {

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {props}
    });
    const location = useLocation();

    return (
        <Link to={`/ingredients/${props._id}` }  state={{background: location}} className={s.link}>

            <div className={s.main} ref={dragRef}>
                <div>
                    {props.count > 0 &&
                        <div className={s.counter}>
                            <Counter count={props.count} size="default"/>
                        </div>
                    }
                </div>

                <img alt={props.title} src={props.image}/>
                <div className={s.price + " mt-1"}>
                    <p className={"mr-1 text text_type_main-medium"}> {props.price}</p>
                    <CurrencyIcon/>
                </div>
                <div className={s.desc + " mt-1"}>
                    <p className={"mt-1"}>{props.name}</p>
                </div>

            </div>
        </Link>
    )

}

Ingredient.propTypes = {
    count: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string

}
export default Ingredient;