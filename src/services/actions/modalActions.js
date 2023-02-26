import {BASE_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse} from "../../Utils/Utils";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";
export const CLEAR_ORDER = "CLEAR_ORDER";

export const fetchOrderRequest = (url, body) =>{
    return async function(dispatch) {
        try{
            const parsedResponse = await fetch(BASE_URL + url, body).then(checkResponse);
            let request = {type: ORDER_SUCCESS, payload: {response: parsedResponse }};
            await dispatch(request);
        } catch (e) {
            dispatch({type: ORDER_ERROR});
            console.log('Возникла проблема с отправкой заказа: ' + ORDER_SUCCESS, e.message);
            dispatch({type: CLEAR_ORDER});
        }
    }
}