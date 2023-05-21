import React, {FC, useCallback} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Modal from "../components/Modal/Modal";
import { useAppDispatch, useAppSelector} from "../Types/types";
import OrderDetails from "../components/Feed/OrderIDetails/OrderDetails";
import {
    getSingleOrderRequest,
    ORDER_MODAL_REQUEST,
    unsetOrderModalDetailsAction
} from "../services/actions/modalFeedOrderActions";
import {singleFeedOrderSelector} from "../services/selectors/selectors";


export const OrderInfo:FC = () =>{
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;
    const orders = useAppSelector(singleFeedOrderSelector);

    const handleModalClose = ():void => {
        dispatch(unsetOrderModalDetailsAction());
        navigate(-1);
    };
    const init = useCallback(() => {
        if (orders.length == 0 && id) {
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