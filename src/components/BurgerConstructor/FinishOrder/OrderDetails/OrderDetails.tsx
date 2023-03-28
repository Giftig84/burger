import React, {FC} from 'react';
import  s from './OrderDetails.module.css'
import image from '../../../../Image/IconDone.png'
import {useSelector} from "react-redux";
import {orderResponseSelector} from "../../../../services/selectors/selectors";
import {TOrderResp} from "../../../../Types/types";


const OrderDetails: FC = ()=>{

const orderResponse: TOrderResp = useSelector(orderResponseSelector)
    return (
        <div className={s.main}>
            <div className={s.header +"  mt-30 "}>
                <p className="text text_type_digits-large">{orderResponse.order.number}</p>
            </div>

            <div className={s.name + " mt-8"}>
                <p className={"mt-1 text text_type_main-medium"}>Идентификатор заказа</p>
            </div>

            <img className={" mt-15"}
                 src={image} alt={"Готовится..."}
            />
            <div className={s.name + " mt-15"}>
                <p className={"mt-1 text text_type_main-medium"}>Ваш заказ начали готовить</p>
            </div>

            <div className={s.name + " mt-2 mb-30"}>
                <p className={"mt-1 text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>

    )
}
export default OrderDetails;