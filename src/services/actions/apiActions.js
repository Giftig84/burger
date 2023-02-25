import {BASE_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse} from "../../Utils/Utils";
import {CLEAR_ORDER, ORDER_REQUEST } from "./modalActions";
import {CLEAR_INGREDIENT, INGREDIENTS_REQUEST} from "./ingredientActions";
export const STATUS_REQUEST = "STATUS_REQUEST";
export const STATUS_SUCCESS = "STATUS_SUCCESS";
export const STATUS_ERROR = "STATUS_ERROR";

export const setRequestStatusAction = (payload) => ({ type: STATUS_REQUEST, payload });
export const setSuccessStatusAction = (payload) => ({ type: STATUS_SUCCESS, payload });
export const setErrorStatusAction = (payload) => ({ type: STATUS_ERROR, payload });

export const fetchRequest = (url, body, actionType) =>{
    return async function(dispatch) {
        try{
            const parsedResponse = await fetch(BASE_URL + url, body).then(checkResponse);
            let request = {type: actionType, payload: {response: parsedResponse }};
            await dispatch(request);
            dispatch(setSuccessStatusAction());
        } catch (e) {
            switch (actionType){
                case ORDER_REQUEST:
                    dispatch(setErrorStatusAction());
                    console.log('Возникла проблема с отправкой заказа: ' + actionType, e.message);
                    dispatch({type: CLEAR_ORDER});
                    break;
                case INGREDIENTS_REQUEST:
                    dispatch(setErrorStatusAction());
                    console.log('Возникла проблема с запросом ингредиентов: ' + actionType, e.message);
                    dispatch({type: CLEAR_INGREDIENT});
                    break;
                default:
                    dispatch(setErrorStatusAction());
                    console.log('Возникла проблема с запросом : ' + actionType, e.message);
                    break;
            }
        }
    }
}
