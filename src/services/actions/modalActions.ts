import {BASE_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse} from "../../Utils/Utils";
import {TDispatch} from "../../Types/types";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";
export const CLEAR_ORDER = "CLEAR_ORDER";

export const fetchOrderRequest = (ingredients: string[])=>{
    return async function(dispatch: TDispatch) {

        try{
            const parsedResponse = await fetch(BASE_URL + "/orders", {
                body: JSON.stringify({ingredients}),
                headers: new Headers([
                    ['Content-Type', 'application/json'],
                ]),
                method: 'POST',
            }).then(checkResponse);
            let request = {type: ORDER_SUCCESS, payload: {response: parsedResponse }};
            dispatch(request);
        } catch (e: unknown) {
            dispatch({type: ORDER_ERROR});
            if(e instanceof Error) {
                console.log('Возникла проблема с отправкой заказа: ' + ORDER_SUCCESS, e.message);
            }
            dispatch({type: CLEAR_ORDER});
        }
    }
}

