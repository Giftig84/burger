import React from 'react';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './BurgerConstructor.module.css';
import FinishOrder from './FinishOrder/FinishOrder';
import PropTypes from 'prop-types';
import {dataIngredient} from "../../ImportFiles/dataIngredient";
import {IngredientContext} from "../../ImportFiles/IngredientContext";
import {useDispatch, useSelector} from "react-redux";
import { useDrop} from "react-dnd";
import {decrementCounterAction, incrementCounterAction} from "../../services/actions/ingredientActions";
import {addIngredientAction,sortIngredientAction} from "../../services/actions/constructorActions";
import {useMemo, useCallback} from "react";
import uuid from 'react-uuid';
import DragItem from "./DragItem";
import {bunSelector, ingredientsSelector, noBunSelector} from "../../services/selectors/selectors";

function BurgerConstructor () {

    const order = useSelector(noBunSelector);
    const bun = useSelector(bunSelector);
    const allIngredietn = useSelector(ingredientsSelector);
    const dispatch = useDispatch();


    const totalSum = useMemo( ()=>{
        let sum = 0;
        if(allIngredietn.length){
            sum = ((order.length) ? order.reduce((sum, el) => sum + el.price, 0) : 0) + ((bun)?(bun.price * 2):0);
        }
        return sum;
    }, [allIngredietn]);

    const [ , drop] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            (itemId.props.type === "bun" && bun) && dispatch(decrementCounterAction(bun._id));
            dispatch(addIngredientAction([{...itemId.props, id: uuid()}]));
            dispatch(incrementCounterAction(itemId.props._id));
        },
    });

    const sortIngredients = useCallback(
        (dragIndex, currentIndex) => {
            //получаем элемент бургера перед вырезкой
            const dragItem = order[dragIndex];
            // копируем массив для сортировки
            const sortedIngredients = [...order];
            // удаляем перетаскиваемый элемент
            sortedIngredients.splice(dragIndex,1);
            // добавляем перетскиваемый элемент + булочка(если имеется)
            (bun) ? (sortedIngredients.splice(currentIndex,0, dragItem, bun)) : (sortedIngredients.splice(currentIndex,0, dragItem));
            dispatch(sortIngredientAction(sortedIngredients));
        },
        [dispatch, allIngredietn]
    );


        return(
            <div className = {s.main + " ml-5"} ref={drop}>
                <div className={s.cont + " ml-4 mt-25"}>
                       {bun ? (<div className={"ml-8"} >
                                           <ConstructorElement
                                               type="top"
                                               isLocked={true}
                                               text= {bun.name + " (верх)"}
                                               price={bun.price}
                                               thumbnail={bun.image_mobile}
                                           />
                                       </div>) : (<div className={"pt-10 ml-20 pl-15"}>
                           <p className="text text_type_main-medium "> Добавьте булку </p></div>)
                       }
                       <div className={s.scroll }  >
                           { order.length >0 ? (
                               order.map((el, index) => {
                              return(
                                       <DragItem key={el.id} el={el} index={index} sortIngredients={sortIngredients}/>
                                      )
                               })) : (<div className={"ml-20 mt-25 pt-30"}><p className="text text_type_main-medium "> Добавьте игредиенты в бургер </p></div>)

                           }
                       </div>
                        {bun ?
                            ( <div className={"ml-8"} >
                                        <ConstructorElement
                                            type="bottom"
                                            isLocked={true}
                                            text= {bun.name + " (низ)"}
                                            price={bun.price}
                                            thumbnail={bun.image_mobile}
                                        />
                                    </div>) : (<div className={"pt-10 ml-20 pl-15"}><p className="text text_type_main-medium "> Добавьте булку </p></div>)
                        }
                <div>

                </div>
                    <div className={s.fin + " mt-10 ml-4 mr-4"}>
                        <FinishOrder totalSum ={totalSum}></FinishOrder>
                    </div>

                </div>
            </div>

        )
}

IngredientContext.propTypes = {
    arrIngredient:  PropTypes.arrayOf(PropTypes.shape(dataIngredient).isRequired).isRequired
};

export default BurgerConstructor;