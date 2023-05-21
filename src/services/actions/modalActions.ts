import {BASE_URL, TOKEN_KEY} from "../../ImportFiles/endPointUrl";
import {checkResponse, getCookie} from "../../Utils/Utils";
import {TDispatch} from "../../Types/types";
import {CLEAR_INGREDIENTS} from "./constructorActions";
import {CLEAR_COUNTER} from "./ingredientActions";

export const ORDER_REQUEST: 'ORDER_REQUEST' = "ORDER_REQUEST";
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = "ORDER_SUCCESS";
export const ORDER_ERROR: 'ORDER_ERROR' = "ORDER_ERROR";
export const CLEAR_ORDER: 'CLEAR_ORDER' = "CLEAR_ORDER";

export type TOrderResponse = {
    name?: string;
    order?: {
        number?: number;
    };
    success?: boolean;
}

interface IOrderRequest {
    readonly type: typeof ORDER_REQUEST;
}
interface IOrderSuccess {
    readonly type: typeof ORDER_SUCCESS;
    payload: {response: TOrderResponse }
}
interface IOrderError {
    readonly type: typeof ORDER_ERROR;
}
interface IClearOrder {
    readonly type: typeof CLEAR_ORDER;
}
export  type TModalOrderAction = IClearOrder | IOrderError | IOrderSuccess | IOrderRequest;

export const fetchOrderRequest = (ingredients: string[])=>{
    return async function(dispatch: TDispatch) {

        try {
            let token = getCookie(TOKEN_KEY);
            if (token != undefined) {
            const parsedResponse = await fetch(BASE_URL + "/orders", {
                body: JSON.stringify({ingredients}),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                method: 'POST',
            }).then(checkResponse);
            let request = {type: ORDER_SUCCESS, payload: {response: parsedResponse}};
            dispatch(request);
            if(parsedResponse.order.number)
            {
                dispatch({type: CLEAR_INGREDIENTS});
                dispatch({type: CLEAR_COUNTER});
            }

        }
        } catch (e: unknown) {
            dispatch({type: ORDER_ERROR});
            if(e instanceof Error) {
                console.log('Возникла проблема с отправкой заказа: ' + ORDER_SUCCESS, e.message);
            }
            dispatch({type: CLEAR_ORDER});
        }
    }
}

