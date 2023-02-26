import {BASE_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse} from "../../Utils/Utils";


export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";
export const SET_DETAILS = "SET_DETAILS";
export const UNSET_DETAILS = "UNSET_DETAILS";
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";
export const SET_CURRENT = "SET_CURRENT";
export const CLEAR_INGREDIENT = "CLEAR_INGREDIENT";

export const setModalDetailsAction = (payload) => ({ type: SET_DETAILS, payload });
export const unsetModalDetailsAction = (payload) => ({ type: UNSET_DETAILS, payload });
export const incrementCounterAction = (payload) => ({ type: INCREMENT_COUNTER, payload });
export const decrementCounterAction = (payload) => ({ type: DECREMENT_COUNTER, payload });
export const setCurrentTabAction = (payload) => ({ type: SET_CURRENT, payload });

export const fetchIngredientRequest = (url) =>{
    return async function(dispatch) {
        try{
            const parsedResponse = await fetch(BASE_URL + url).then(checkResponse);
            let request = {type: INGREDIENTS_SUCCESS, payload: {response: parsedResponse }};
            await dispatch(request);

        } catch (e) {
            dispatch({type: INGREDIENTS_ERROR});
            console.log('Возникла проблема с запросом ингредиентов: ' + INGREDIENTS_SUCCESS, e.message);
            dispatch({type: CLEAR_INGREDIENT});
        }
    }
}

