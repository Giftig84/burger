import {
    SET_STATUS
} from "../actions/apiActions";

const defaultState = {
    isLoading: false,
    hasError: false
}

export const apiReducer = (state = defaultState, action) =>{
    switch (action){
        case SET_STATUS:
            debugger;
            return {...state, isLoading: action.payload.isLoading, hasError: action.payload.hasError };
        default:
            return state;
    }
}