import React, {FC} from 'react';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './FinishOrder.module.css'
import Modal from "../../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_ORDER, fetchOrderRequest, ORDER_REQUEST} from "../../../services/actions/modalActions";
import {allOrderSelector, authSelector} from "../../../services/selectors/selectors";
import {useNavigate} from "react-router-dom";
import {TDispatch, TOrderIngredient} from "../../../Types/types";

type TProps = {
    totalSum: number;
}

const FinishOrder: FC <TProps> =(props) =>{
    const [isModal, setModal] = React.useState(false);

    const order: Array<TOrderIngredient> = useSelector(allOrderSelector);
    const isAuth: boolean | undefined = useSelector(authSelector);
    const navigate = useNavigate();

    const dispatch: TDispatch  = useDispatch();


    const ingredients = React.useMemo(() => order.map(el => el._id)
        , [order]);
    const send = () => {
        dispatch({type: ORDER_REQUEST});
        dispatch(fetchOrderRequest(ingredients));
    };

    function openModal(e: React.SyntheticEvent) {
        e.stopPropagation();
        debugger;
        if (isAuth) {
            send();
            setModal(true);
        } else {
           navigate('/login');
        }
    }

    function closeModal() {
        setModal(false);
        dispatch({type: CLEAR_ORDER});
    }

    return (
        <div className={s.order}>

            <p className={"text text_type_main-large mr-3"}>{props.totalSum}</p>
            <div className={s.amount_icon}>
                <CurrencyIcon type="primary"/>
            </div>
            <div className={"ml-10"}>
                {order.length > 0 && (<Button htmlType="button" type="primary" size="large" onClick={openModal}>
                    Оформить заказ
                </Button>)}

                {isModal  &&
                    <Modal closeModal={closeModal}> <OrderDetails/> </Modal>}
            </div>
        </div>
    )
}

export default React.memo(FinishOrder);