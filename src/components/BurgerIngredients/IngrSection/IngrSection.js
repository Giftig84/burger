import React, {useEffect} from 'react';
import  s from './IngrSection.module.css'
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";
import {setCurrentTabAction} from "../../../services/actions/ingredientActions";
import {ingredientsSelector} from "../../../services/selectors/selectors";

const IngrSection = React.forwardRef((props, ref2) => {
    let ingrType;
    const dispatch = useDispatch();
    const arrIngredient = useSelector(ingredientsSelector);
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
                                    <Ingredient count = {el?.count} {...el}  />
                                </div>
                            )
                        else return  null;
                    })}
                </div>
            </>
        )
});

IngrSection.propTypes = {
    name: PropTypes.string
};
export  default  IngrSection;

