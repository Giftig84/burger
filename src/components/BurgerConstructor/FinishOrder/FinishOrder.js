import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './FinishOrder.module.css'
import PropTypes from "prop-types";
import Modal from "../../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import {IngredientContext} from "../../../ImportFiles/IngredientContext";
import {dataIngredient} from "../../../ImportFiles/dataIngredient";




function FinishOrder (props){
    const [isModal, setModal] = React.useState(false);

    const urlOrder = "https://norma.nomoreparties.space/api/orders";
    const {order} = React.useContext(IngredientContext);

    const [orderDetails, setOrderDetails] = React.useState({
        isLoading: false,
        hasError: false,
        orderResponse: {
            "name": "",
            "order": {
                "number": 0
            },
            "success": true
        }
    });
    const send = () => {
        try {
            const ingredients = order.arrIngredient.filter(el => (el.type !== "bun" || el.name === "Краторная булка N-200i")).map(el=>el._id);

            const sendOrder = async () => {
                setOrderDetails(({ ...orderDetails, hasError: false, isLoading: true }));
                const response = await fetch(urlOrder, {
                    body: JSON.stringify({ingredients}),
                    headers: new Headers([
                        ['Content-Type', 'application/json'],
                    ]),
                    method: 'POST',
                });
                if (!response .ok) {
                    throw new Error('Ошибка получениия данных');
                }
                const parsedResponse = await response.json();
                setOrderDetails({ ...orderDetails, orderResponse: parsedResponse, isLoading: false });

            }
            sendOrder();

        }  catch (e) {
            {
                setOrderDetails({ ...orderDetails, hasError: true, isLoading: false });
                console.log('Возникла проблема с размещение заказа: ', e.message);
            }
        }


    };

    function openModal () {
        send();
        setModal(true);
    };

    function closeModal (e) {
        e.stopPropagation();
        setModal(false);
    };

        return (
            <div className={s.order}>
                    <p className={"text text_type_main-large mr-3"}>{props.totalSum}</p>
                    <div className={s.amount_icon}>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <div className={"ml-10"} onClick={openModal}>
                        <Button htmlType="button" type="primary" size="large">
                            Оформить заказ
                        </Button>
                        {isModal &&
                            <Modal closeModal={closeModal}> <OrderDetails orderDetails={orderDetails}/>  </Modal>}
                    </div>
            </div>
        )
}

FinishOrder.propTypes = {
    totalSum: PropTypes.number
};

IngredientContext.propTypes = {
    arrIngredient:  PropTypes.arrayOf(PropTypes.shape(dataIngredient).isRequired).isRequired
};

export default FinishOrder;