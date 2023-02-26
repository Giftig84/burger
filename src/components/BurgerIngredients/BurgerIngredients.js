import React from 'react';
import  s from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import IngrSection from "./IngrSection/IngrSection";
import Tabs from "./Tabs/Tabs";
import {dataIngredient} from "../../ImportFiles/dataIngredient";


function BurgerIngredients () {
    const refSouse =React.useRef(null);
    const refBun = React.useRef(null);
    const refMain = React.useRef(null);

    return(
           <div className={s.main + " mr-5"}>
               <div className={s.header + " mt-10"}>
                   <p>Соберите бургер</p>
               </div>
               <div >
                   <Tabs sauce={refSouse} main={refMain} bun={refBun} />
               </div>
               <div className={s.scroll} id = "tabsDiv" >
                   <IngrSection name={"Булки"} ref={refBun}/>
                   <IngrSection name={"Соусы"} ref={refSouse}/>
                   <IngrSection name={"Начинки"} ref={refMain}/>
               </div>
           </div>
       )

}

BurgerIngredients.propTypes = {
    arrIngredient: PropTypes.arrayOf(PropTypes.shape(dataIngredient).isRequired) //.isRequired
};
export default React.memo(BurgerIngredients);
