
import {
    INGREDIENT_MODAL_REQUEST,
    INGREDIENT_MODAL_SUCCESS,
    INGREDIENT_MODAL_ERROR,
    UNSET_DETAILS,
    TModalDetailActions
} from "../actions/modalDetailsActions";
import {TIngredient} from "../../Types/types";

export  type  TModalDetailsState = {
    modalDetails: TIngredient | undefined ;
    isLoading: boolean;
    hasError: boolean;
}
const defaultState: TModalDetailsState = {
    modalDetails: undefined,
    isLoading: false,
    hasError: false
}

export const modalDetailsReducer= (state = defaultState, action: TModalDetailActions) => {

    switch (action.type) {
        case INGREDIENT_MODAL_REQUEST:
            return {...state, isLoading: true, hasError: false };

        case INGREDIENT_MODAL_ERROR:
            return {...state, isLoading: false, hasError: true };

        case INGREDIENT_MODAL_SUCCESS:
            return {...state, modalDetails: action.payload, isModal: true};

        case UNSET_DETAILS:
            return {...state, modalDetails: undefined};

        default:
            return state;
    }
}