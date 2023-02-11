import React from 'react';
import  s from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import IngrSection from "./IngrSection/IngrSection";
import Tabs from "./Tabs/Tabs";

function BurgerIngredients (props) {

       return(
           <div className={s.main + " mr-5"}>
               <div className={s.header + " mt-10"}>
                   <p>Соберите бургер</p>
               </div>
               <Tabs/>
               <div className={s.scroll}>
                   <IngrSection name={"Булки"} arrIngredient={props.arrIngredient}/>
                   <IngrSection name={"Соусы"} arrIngredient={props.arrIngredient}/>
                   <IngrSection name={"Начинки"} arrIngredient={props.arrIngredient}/>
               </div>
           </div>
       )

}

const dataIngredient =  {
        _id: PropTypes.string.isRequired ,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        flat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }
BurgerIngredients.propTypes = {
    arrIngredient: PropTypes.arrayOf(PropTypes.shape(dataIngredient))
};
 export  default BurgerIngredients ;