import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './FinishOrder.module.css'
import PropTypes from "prop-types";
import Modal from "../../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import {IngredientContext} from "../../../ImportFiles/IngredientContext";
import {dataIngredient} from "../../../ImportFiles/dataIngredient";
import {useDispatch, useSelector} from "react-redux";
import {fetchRequest, setRequestStatusAction} from "../../../services/actions/apiActions";
import  {CLEAR_ORDER, ORDER_REQUEST} from "../../../services/actions/modalActions";
import {allOrderSelector} from "../../../services/selectors/selectors";

function FinishOrder (props){
    const [isModal, setModal] = React.useState(false);

    const order = useSelector(allOrderSelector);
    const dispatch = useDispatch();

    const ingredients = React.useMemo(()=>order.map(el=>el._id)
        ,[order]);
    const send = () => {
        dispatch(setRequestStatusAction());
        dispatch(fetchRequest("/orders",{
            body: JSON.stringify({ingredients}),
            headers: new Headers([
                ['Content-Type', 'application/json'],
            ]),
            method: 'POST',
        }, ORDER_REQUEST));
    };

    function openModal (e) {
        e.stopPropagation();
        send();
        setModal(true);
    }

    function closeModal (e) {
        e.stopPropagation();
        setModal(false);
        dispatch({type: CLEAR_ORDER});
    }
        return (
            <div className={s.order}>

                    <p className={"text text_type_main-large mr-3"}>{props.totalSum}</p>
                    <div className={s.amount_icon}>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <div className={"ml-10"} >
                        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
                            Оформить заказ
                        </Button>
                        {isModal &&
                            <Modal closeModal={closeModal}> <OrderDetails/>  </Modal>}
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

export default React.memo(FinishOrder);