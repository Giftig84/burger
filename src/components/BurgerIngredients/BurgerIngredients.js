import React from 'react';
import  s from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import IngrSection from "./IngrSection/IngrSection";
import Tabs from "./Tabs/Tabs";
import {dataIngredient} from "../../ImportFiles/dataIngredient";

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

BurgerIngredients.propTypes = {
    arrIngredient: PropTypes.arrayOf(PropTypes.shape(dataIngredient).isRequired).isRequired
};
 export  default BurgerIngredients ;