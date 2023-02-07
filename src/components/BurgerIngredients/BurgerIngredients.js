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
                   <IngrSection name={"Булки"} data={props.data}/>
                   <IngrSection name={"Соусы"} data={props.data}/>
                   <IngrSection name={"Начинки"} data={props.data}/>
               </div>
           </div>
       )

}
BurgerIngredients.propTypes = {
    data: PropTypes.array
};
 export  default BurgerIngredients ;