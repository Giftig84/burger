import React, {FC, useCallback} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Modal from "../components/Modal/Modal";
import {TDispatch, TOrder} from "../Types/types";
import OrderDetails from "../components/Feed/OrderIDetails/OrderDetails";
import {
    getSingleOrderRequest,
    ORDER_MODAL_REQUEST,
    unsetOrderModalDetailsAction
} from "../services/actions/modalFeedOrderActions";
import {singleFeedOrderSelector} from "../services/selectors/selectors";


export const OrderInfo:FC = () =>{
    const {id} = useParams();
    const dispatch: TDispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;
    const orders: Array<TOrder> = useSelector(singleFeedOrderSelector);

    const handleModalClose = ():void => {
        dispatch(unsetOrderModalDetailsAction());
        navigate(-1);
    };
    const init = useCallback(() => {
        if (orders.length == 0) {
            dispatch({type: ORDER_MODAL_REQUEST});
            dispatch(getSingleOrderRequest(id));
        }
    }, [orders, dispatch, id]);
    React.useEffect(() => {
        init();
    }, [id]);

    return (
        <>
            {background ? (<Modal closeModal={handleModalClose}> <OrderDetails /> </Modal>) : (<OrderDetails />)}
        </>
    )
}