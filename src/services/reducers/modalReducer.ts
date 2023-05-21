import {
    ORDER_REQUEST, CLEAR_ORDER, ORDER_SUCCESS, ORDER_ERROR, TModalOrderAction
} from "../actions/modalActions";

export type TModalState = {
    orderResponse: any;
    isLoading: boolean;
    hasError: boolean;
}
const defaultState: TModalState = {

    orderResponse: {
        "name": "",
        "order": {
            "number": 0
        },
        "success": true
    },
    isLoading: false,
    hasError: false
}

export const modalReducer= (state = defaultState, action: TModalOrderAction) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {...state, isLoading: true, hasError: false };

        case ORDER_SUCCESS:
            return {...state, orderResponse: {...action.payload.response}, isLoading: false, hasError: false};

        case ORDER_ERROR:
            return {...state, isLoading: false, hasError: true };

        case CLEAR_ORDER:
            return {...state, orderResponse: {
                    "name": "",
                    "order": {
                        "number": 0
                    },
                    "success": ""
                }};
        default:
            return state;
    }
}