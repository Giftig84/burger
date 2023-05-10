import {BASE_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse} from "../../Utils/Utils";
import {TDispatch, TIngredient} from "../../Types/types";
export const INGREDIENT_MODAL_REQUEST: 'INGREDIENT_MODAL_REQUEST' = "INGREDIENT_MODAL_REQUEST";
export const INGREDIENT_MODAL_SUCCESS: 'INGREDIENT_MODAL_SUCCESS' = "INGREDIENT_MODAL_SUCCESS";
export const INGREDIENT_MODAL_ERROR: 'INGREDIENT_MODAL_ERROR' = "INGREDIENT_MODAL_ERROR";
export const UNSET_DETAILS: 'UNSET_DETAILS' = "UNSET_DETAILS";

export interface IUnsetModalDetailsAction {
    readonly type: typeof UNSET_DETAILS;
}
export interface IModalRequest {
    readonly type: typeof INGREDIENT_MODAL_REQUEST;
}

export interface IModalSuccess {
    readonly type: typeof INGREDIENT_MODAL_SUCCESS;
    payload: TIngredient;
}

export interface IModalError {
    readonly type: typeof INGREDIENT_MODAL_ERROR;
}

export  type TModalDetailActions = IUnsetModalDetailsAction | IModalRequest | IModalSuccess | IModalError;

export const unsetModalDetailsAction = (): IUnsetModalDetailsAction => ({ type: UNSET_DETAILS });

export const fetchModalIngredientRequest = (ingrId: string| undefined) =>{
    return async function(dispatch: TDispatch) {
        try{

            const parsedResponse = await fetch(BASE_URL + "/ingredients").then(checkResponse);
            const ingredient = [...parsedResponse.data].find(el => el._id === ingrId);
            let request = {type: INGREDIENT_MODAL_SUCCESS, payload: ingredient};
            await dispatch(request);

        } catch (e: unknown) {
            dispatch({type: INGREDIENT_MODAL_ERROR});
            if(e instanceof Error) {
                console.log('Возникла проблема с запросом ингредиентов: ' + INGREDIENT_MODAL_SUCCESS, e.message);
            }
            dispatch({type: UNSET_DETAILS});
        }
    }
}



