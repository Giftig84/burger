import {TOrder} from "../../Types/types";
import {
    ORDER_MODAL_ERROR,
    ORDER_MODAL_REQUEST,
    ORDER_MODAL_SUCCESS,
    TModalFeedOrderActions,
    UNSET_ORDER_DETAILS
} from "../actions/modalFeedOrderActions";

export  type  TModalFeedOrderState = {
    modalDetails: Array<TOrder> | [];
    isLoading: boolean;
    hasError: boolean;
}
export const defaultState: TModalFeedOrderState = {
    modalDetails: [],
    isLoading: false,
    hasError: false
}

export const modalFeedOrderReducer= (state = defaultState, action: TModalFeedOrderActions) => {

    switch (action.type) {
        case ORDER_MODAL_REQUEST:
            return {...state, isLoading: true, hasError: false };

        case ORDER_MODAL_ERROR:
            return {...state, isLoading: false, hasError: true };

        case ORDER_MODAL_SUCCESS:
            return {...state, modalDetails: action.payload, isModal: true,  isLoading: false};

        case UNSET_ORDER_DETAILS:
            return {...state, modalDetails: []};

        default:
            return state;
    }
}