import React, {FC, useCallback} from 'react';
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import s from "../components/App/app.module.css";
import {fetchIngredientRequest, INGREDIENTS_REQUEST} from "../services/actions/ingredientActions";
import {useDispatch, useSelector} from "react-redux";
import {ingredientsSelector} from "../services/selectors/selectors";
import {TDispatch, TIngredient} from "../Types/types";

export const Main:FC = () => {
    const dispatch: TDispatch= useDispatch();
    const allIngredietn: Array<TIngredient> = useSelector(ingredientsSelector);
    const init = useCallback(()=>{
        if(allIngredietn.length==0) {
            dispatch({type: INGREDIENTS_REQUEST});
            dispatch(fetchIngredientRequest("/ingredients"));
        }
    },[allIngredietn, dispatch])
    React.useEffect(() => {
        init();
    }, []);
    return (
        <main className={s.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
        </main>
    )
}