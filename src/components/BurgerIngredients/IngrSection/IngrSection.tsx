import React, {useEffect} from 'react';
import  s from './IngrSection.module.css'
import Ingredient from "../Ingredient/Ingredient";
import {useDispatch, useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";
import {setCurrentTabAction} from "../../../services/actions/ingredientActions";
import {ingredientsSelector} from "../../../services/selectors/selectors";
import {TIngredient} from "../../../Types/types";

export type TIngrType = 'bun'|'sauce'|'main'|'unknown';
type TProps = {
    name: string;
}
type TIngArr = Array<TIngredient & {count: number}>;
type TRef = HTMLDivElement;
const IngrSection = React.forwardRef<TRef, TProps> ((props, ref2) => {
    let ingrType: TIngrType;
    const dispatch = useDispatch();
    const arrIngredient: TIngArr = useSelector(ingredientsSelector);
    switch (props.name){
            case "Булки": ingrType='bun'; break;
            case "Соусы": ingrType='sauce'; break;
            case "Начинки": ingrType='main'; break;
            default: ingrType = 'unknown';
    }
    //логика отслеживания табов
    const tabs = document.getElementById("tabsDiv"); // id в секции BurgerIngredients
    const { ref, inView } = useInView({
        threshold: 0,
        root: tabs,
        rootMargin: "0px 0px -600px"
    });
    useEffect(()=>{
        inView && dispatch(setCurrentTabAction(ingrType));
    },[inView]);

    return(
            <>
                <div className={ "mt-10"} ref={ref2}>
                    <p className="text text_type_main-medium">{props.name}</p>
                </div>
                <div className={s.items + " mt-6"}  ref={ref}>
                    { arrIngredient.map((el)=>{
                        if(el.type === ingrType)
                            return (
                                <div className={s.ingr + " ml-4 mr-2"} key = {el._id} >
                                    <Ingredient {...el}  />
                                </div>
                            )
                        else return  null;
                    })}
                </div>
            </>
        )
});

export  default  IngrSection;

