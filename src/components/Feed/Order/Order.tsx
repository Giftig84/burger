import React, {FC, useMemo} from 'react';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './Order.module.css'
import {Link, useLocation} from "react-router-dom";
import {TOrder, useAppSelector} from "../../../Types/types";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientsSelector} from "../../../services/selectors/selectors";


type TProps = TOrder & {linkTo? : string, showStatus?: boolean};
const Order: FC<TProps> = (props) => {
    const allIngredients = props.ingredients;

    const location = useLocation();
    const arrIngredient = useAppSelector(ingredientsSelector);

    const getPrice = (id: string): number => {
        let index = arrIngredient.findIndex((el => el._id === id))
        if (index > 0) return Number(arrIngredient[index].price);
        else return 0;
    };

    const imgArr = useMemo<Array<string | undefined>>(() => {
        return allIngredients.map(id => {
            let index = arrIngredient.findIndex((el => el._id === id))
            if (index > 0) return arrIngredient[index].image_mobile;
        }).filter(img => img !== undefined);
    }, [allIngredients]);

    const burgerPrice = useMemo<number>(() => {
        let sum: number = 0;
        if (allIngredients.length) {
            sum = ((arrIngredient.length) ? allIngredients.reduce((sum, el) => sum + getPrice(el), 0) : 0);
        }
        return sum;
    }, [allIngredients]);

    enum status {
        created = "Отменён",
        pending = "Готовится",
        done = "Выполнен"
    }

    return (
        <Link to={`${props.linkTo}${props.number}`} state={{background: location}} className={s.link + ` mb-4 mr-2`}>
            <div className={s.main + ` mb-4 mr-2`}>
                <div className={s.header + ` mt-6`}>
                    <p className={`text text_type_digits-default`}>{`# ${props.number}`}</p>
                    <p className={" text text_type_main-small text_color_inactive"}>
                        <FormattedDate date={new Date(props.createdAt)}/>
                    </p>
                </div>
                 <p className={s.desc + " text text text_type_main-medium mt-6"}>{props.name}</p>
                {props.showStatus && <p className={s.desc + " text text text_type_main-default mt-6"}>{status[props.status]}</p>}
                <div className={s.footer + " mb-6"}>
                    <div className={s.imgContainer + " ml-6"}>
                        {imgArr.length > 0 && (
                            imgArr.map((el, index) => {
                              if(index < 6)  return (
                                    <div className={s.imgFr} style={{zIndex: index } } key={index}>
                                        <img className={s.img} src={el} alt={"Изображение ингредиента"}/>
                                    </div>
                                )
                                if(index > 6 && index == imgArr.length -1 )  return (

                                    <span className={`${s.imgText} text text_type_digits-default`}
                                          style={{zIndex: index}} key={index}>
                                    +{imgArr.length - 6}
                                    </span>
                                )

                            }))
                        }
                    </div>
                    <div className={s.price}>
                        <p className={`text text text_type_main-medium mr-2`}>{burgerPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </Link>
    )

}

export default Order;