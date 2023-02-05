import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './FinishOrder.module.css'
import PropTypes from "prop-types";



class FinishOrder extends  React.Component {
    render() {
        return (
            <div className={s.order}>

                    <p className={"text text_type_main-large mr-3"}>{this.props.totalSum}</p>
                    <div className={s.amount_icon}>
                        <CurrencyIcon type="primary"/>
                    </div>


                    <div className={"ml-10"}>
                        <Button htmlType="button" type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </div>

            </div>
        )
    }
}

FinishOrder.propTypes = {
    totalSum: PropTypes.number
};
export default FinishOrder;