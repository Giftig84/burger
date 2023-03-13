import {BASE_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse} from "../../Utils/Utils";


export const INGREDIENT_MODAL_REQUEST = "INGREDIENT_MODAL_REQUEST";
export const INGREDIENT_MODAL_SUCCESS = "INGREDIENT_MODAL_SUCCESS";
export const INGREDIENT_MODAL_ERROR = "INGREDIENT_MODAL_ERROR";
export const UNSET_DETAILS = "UNSET_DETAILS";

export const unsetModalDetailsAction = (payload) => ({ type: UNSET_DETAILS, payload });

export const fetchModalIngredientRequest = (ingrId) =>{
    return async function(dispatch) {
        try{

            const parsedResponse = await fetch(BASE_URL + "/ingredients").then(checkResponse);
            const ingredient = [...parsedResponse.data].find(el => el._id === ingrId);
            let request = {type: INGREDIENT_MODAL_SUCCESS, payload: ingredient};
            await dispatch(request);

        } catch (e) {
            dispatch({type: INGREDIENT_MODAL_ERROR});
            console.log('Возникла проблема с запросом ингредиентов: ' + INGREDIENT_MODAL_SUCCESS, e.message);
            dispatch({type: UNSET_DETAILS});
        }
    }
}

