import { SINGLE_ORDER_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse} from "../../Utils/Utils";
import {TDispatch,  TOrder} from "../../Types/types";



export const ORDER_MODAL_REQUEST: 'ORDER_MODAL_REQUEST' = "ORDER_MODAL_REQUEST";
export const ORDER_MODAL_SUCCESS: 'ORDER_MODAL_SUCCESS' = "ORDER_MODAL_SUCCESS";
export const ORDER_MODAL_ERROR: 'ORDER_MODAL_ERROR' = "ORDER_MODAL_ERROR";
export const UNSET_ORDER_DETAILS: 'UNSET_ORDER_DETAILS' = "UNSET_ORDER_DETAILS";

export interface IUnsetOrderModalDetailsAction {
    readonly type: typeof UNSET_ORDER_DETAILS;
}
export interface IOrderModalRequest {
    readonly type: typeof ORDER_MODAL_REQUEST;
}

export interface IOrderSuccess {
    readonly type: typeof ORDER_MODAL_SUCCESS;
    payload: TOrder;
}

export interface IOrderModalError {
    readonly type: typeof ORDER_MODAL_ERROR;
}

export  type TModalFeedOrderActions = IUnsetOrderModalDetailsAction | IOrderModalRequest | IOrderSuccess | IOrderModalError;

export const unsetOrderModalDetailsAction = (): IUnsetOrderModalDetailsAction => ({ type: UNSET_ORDER_DETAILS });



export const getSingleOrderRequest = (orderNumber: string| undefined) =>{
    return async function(dispatch: TDispatch) {
        try{

            const parsedResponse = await fetch(SINGLE_ORDER_URL + orderNumber).then(checkResponse);
            let request = {type: ORDER_MODAL_SUCCESS, payload: parsedResponse.orders};
            await dispatch(request);

        } catch (e: unknown) {
            dispatch({type: ORDER_MODAL_ERROR});
            if(e instanceof Error) {
                console.log('Возникла проблема с запросом заказа: ' + ORDER_MODAL_SUCCESS, e.message);
            }
            dispatch({type: UNSET_ORDER_DETAILS});
        }
    }
}

