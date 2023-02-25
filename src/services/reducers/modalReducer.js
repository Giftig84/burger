import {
     ORDER_REQUEST, CLEAR_ORDER
} from "../actions/modalActions";


const defaultState = {

    orderResponse: {
        "name": "",
        "order": {
            "number": 0
        },
        "success": true
    }
}

export const modalReducer= (state = defaultState, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {...state, orderResponse: {...action.payload.response}};
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