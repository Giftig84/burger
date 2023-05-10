import React, {FC} from 'react';
import s from './OrderDetails.module.css'
import {useSelector} from "react-redux";
import {
    ingredientsSelector,
    singleFeedOrderSelector
} from "../../../services/selectors/selectors";
import {TIngredient, TOrder} from "../../../Types/types";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderItem} from "./OrderItem/OrderItem";

type TDistinct = {
    name: string;
    img: string;
    qty: number;
    price: number;
}

const OrderDetails: FC = () => {
    const details: Array<TOrder> = useSelector(singleFeedOrderSelector);
    const arrIngredient: Array<TIngredient> = useSelector(ingredientsSelector);
    const arrDistinctIngr: Array<TDistinct> = [];
    let burgerPrice: number = 0;


    //  группируем элементы по типу, получаем их количество
    const ingrSortArray = new Map();
    if (details.length > 0)
        details[0].ingredients.forEach(el => {
            ingrSortArray.has(el) ? ingrSortArray.set(el, ingrSortArray.get(el) + 1) : ingrSortArray.set(el, 1);
        });

    // собирем финальный массив для отрисовки элементов бургера
    ingrSortArray.forEach((value, key, map) => {
        let index = arrIngredient.findIndex((el => el._id === key))
        if (index >= 0) {
            arrDistinctIngr.push({
                name: arrIngredient[index].name,
                price: Number(arrIngredient[index].price),
                img: arrIngredient[index].image_mobile,
                qty: value
            });
            burgerPrice = burgerPrice + Number(arrIngredient[index].price) * value;
        }
    })

    enum status {
        created = "Отменён",
        pending = "Готовится",
        done = "Выполнен"
    }

    if (details.length > 0) {
        return (
            <div className={s.main}>

                <div className={s.header + " ml-10 mt-10 mr-10"}>
                    <p className="text text_type_main-medium"># {details[0].number} </p>
                </div>
                <div className={"mt-10"}>
                    <p className={s.name + " text text_type_main-medium"}>{details[0].name}</p>
                </div>
                <div className={s.name + " mt-3"}>
                    <p className={s.doneOrder + " text text_type_main-medium"}>{status[details[0].status]}</p>
                </div>
                <div className={s.name + " mt-15"}>
                    <p className={"text text_type_main-medium"}>Состав:</p>
                </div>
                <div className={s.scroll} id="tabsDiv">
                    {arrDistinctIngr.length > 0 && (
                        arrDistinctIngr.map((el, index) => {
                            return (<OrderItem img={el.img}
                                               name={el.name}
                                               qty={el.qty}
                                               key={index}
                                               price={el.price}/>
                            )
                        }))
                    }

                </div>
                <div className={s.footer + " mt-10 mb-2"}>
                    <p className={" text text_type_main-small text_color_inactive"}>
                        <FormattedDate date={new Date(details[0].createdAt)}/>
                    </p>
                    <div className={s.price}>
                        <p className={`text text text_type_main-medium mr-2`}>{burgerPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>


            </div>
        )
    } else return (
        <div className={s.main}>
            <div className={s.header + " ml-10 mt-10 mr-10"}>
                <p className="text text_type_main-medium"></p>
            </div>
        </div>
    );

}

export default OrderDetails;