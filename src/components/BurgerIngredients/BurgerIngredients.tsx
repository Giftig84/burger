import React, {FC} from 'react';
import  s from './BurgerIngredients.module.css';
import IngrSection from "./IngrSection/IngrSection";
import Tabs from "./Tabs/Tabs";

const BurgerIngredients: FC = () =>{
    const refSouse =React.useRef<HTMLDivElement>(null);
    const refBun = React.useRef<HTMLDivElement>(null);
    const refMain = React.useRef<HTMLDivElement>(null);

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

export default React.memo(BurgerIngredients);
