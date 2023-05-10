import React, {FC} from 'react';
import s from './OrderItem.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type TProps = {
    img: string;
    name: string;
    qty: number;
    price: number;
}
export const OrderItem: FC<TProps> = ( props ) =>
{
    return (
        <div className={s.main + " mt-6"}>
            <div className={s.imgFr} >
                <img className={s.img} src={props.img} alt={"Изображение ингредиента"}/>
            </div>
            <div className={s.name}>
                <p className={ " ml-4 text text_type_main-medium"}>{props.name}</p>
            </div>
            <div className={s.price}>
                <p className={" text text text_type_main-medium mr-2"}>{props.qty} X {props.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
        </div>
    )
}