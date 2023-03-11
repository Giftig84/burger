
import {INGREDIENT_MODAL_REQUEST, INGREDIENT_MODAL_SUCCESS, INGREDIENT_MODAL_ERROR, UNSET_DETAILS} from "../actions/modalDetailsActions";


const defaultState = {
    modalDetails: {},
    isLoading: false,
    hasError: false
}

export const modalDetailsReducer= (state = defaultState, action) => {

    switch (action.type) {
        case INGREDIENT_MODAL_REQUEST:
            return {...state, isLoading: true, hasError: false };

        case INGREDIENT_MODAL_ERROR:
            return {...state, isLoading: false, hasError: true };

        case INGREDIENT_MODAL_SUCCESS:
            return {...state, modalDetails: action.payload, isModal: true};

        case UNSET_DETAILS:
            return {...state, modalDetails: {}};

        default:
            return state;
    }
}