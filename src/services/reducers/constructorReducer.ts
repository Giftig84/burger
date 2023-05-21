import {
    ADD_INGREDIENT, CLEAR_INGREDIENTS, DELETE_INGREDIENT, SORT_INGREDIENT, TConstructorActions
} from "../actions/constructorActions";
import {TOrderIngredient} from "../../Types/types";

type TConstructorReducerState = {
    arrConstrIngr: Array<TOrderIngredient> | [];
    orderResponse: {
        name: string | null | undefined;
        order:{
            number: number;
        };
        success: boolean;
    }
}
const defaultState: TConstructorReducerState = {
    arrConstrIngr: [],
    orderResponse: {
        "name": "",
        "order": {
            "number": 0
        },
        "success": true
    }
}

export const constructorReducer= (state = defaultState, action: TConstructorActions) => {
    let arr: Array<TOrderIngredient>;
    let index: number;
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
        case CLEAR_INGREDIENTS:
            return {...state, arrConstrIngr: []};

        default:
            return state;
    }
}