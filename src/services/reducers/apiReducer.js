import {
    STATUS_REQUEST, STATUS_SUCCESS, STATUS_ERROR
} from "../actions/apiActions";

const defaultState = {
    isLoading: false,
    hasError: false
}

export const apiReducer = (state = defaultState, action) =>{
    switch (action){
        case STATUS_REQUEST:
            return {...state, isLoading: true, hasError: false };

            case STATUS_SUCCESS:
            return {...state, isLoading: false, hasError: false };

            case STATUS_ERROR:
            return {...state, isLoading: false, hasError: true };

        default:
            return state;
    }
}