import {
    ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENT
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