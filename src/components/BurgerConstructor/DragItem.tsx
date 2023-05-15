import s from "./BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {useDrag, useDrop} from "react-dnd";
import {decrementCounterAction} from "../../services/actions/ingredientActions";
import {deleteConstructorItemAction} from "../../services/actions/constructorActions";
import {TOrderIngredient, useAppDispatch} from "../../Types/types";

type TProps = {
    el: TOrderIngredient;
    index: number;
    sortIngredients: (A: number,B: number)=>void;
}
type TDragObj = {
    index: number;
}
const DragItem: FC<TProps> =  ({el, index, sortIngredients}) =>{

     const dispatch = useAppDispatch();

     const refItem = React.useRef(null);
     const [, dragRef] = useDrag({
         type: 'item',
         item: {index}

     });
     const [, drop] = useDrop({
         accept: 'item',
         drop(dragged: TDragObj) {
             sortIngredients(dragged.index, index);
         },
     });

     const delItem = () => {
         dispatch(decrementCounterAction(el._id));
         dispatch(deleteConstructorItemAction(el.id));
     }

     dragRef(drop(refItem));


    return (
        <div className={ s.center +" mr-2"}  ref={refItem}>
            <div className={s.dragIcon}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={el.name}
                price={el.price}
                thumbnail={el.image_mobile}
                handleClose={() => delItem ()}
            />
        </div>
    )
}
export default DragItem;