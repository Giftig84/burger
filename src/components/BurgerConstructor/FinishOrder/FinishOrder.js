import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './FinishOrder.module.css'
import PropTypes from "prop-types";
import Modal from "../../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";




function FinishOrder (props){
    const [isModal, setModal] = React.useState(false);

    function openModal () {
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
                            <Modal closeModal={closeModal}> <OrderDetails/>  </Modal>}
                    </div>
            </div>
        )
}

FinishOrder.propTypes = {
    totalSum: PropTypes.number
};
export default FinishOrder;