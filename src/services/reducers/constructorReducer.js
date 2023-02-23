import {
    ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENT, ORDER_REQUEST, CLEAR_ORDER
} from "../actions/constructorActions";


const defaultState = {
    arrConstrIngr: [],
    orderResponse: {
        "name": "",
        "order": {
            "number": 0
        },
        "success": true
    }
}

export const constructorReducer= (state = defaultState, action) => {
    let arr;
    let index;
    switch (action.type) {
        case SORT_INGREDIENT:
            return {...state, arrConstrIngr: [...action.payload]};
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


        case ADD_INGREDIENT:
            if(state.arrConstrIngr.length ===0)
                return {...state, arrConstrIngr:  action.payload};
            else if( action.payload[0].type === "bun")
                return {...state, arrConstrIngr: [ ...state.arrConstrIngr.filter(el => el.type !== "bun"),...action.payload]};
            else
                return {...state, arrConstrIngr:  [...state.arrConstrIngr,...action.payload]};

        case DELETE_INGREDIENT:
            arr = [ ...state.arrConstrIngr];
            index = arr.findIndex((el => el.id === action.payload));
            arr.splice(index,1);
            return {...state, arrConstrIngr: arr};

        default:
            return state;
    }
}