import {
    DECREMENT_COUNTER, INGREDIENTS_SUCCESS, INCREMENT_COUNTER,
    SET_CURRENT, CLEAR_INGREDIENT, INGREDIENTS_REQUEST, INGREDIENTS_ERROR, TIngredientActions, CLEAR_COUNTER
} from "../actions/ingredientActions";
import {TIngredient} from "../../Types/types";
import {TIngrType} from "../../components/BurgerIngredients/IngrSection/IngrSection";

type TIngredientsReducerState = {
    arrIngredient: Array<TIngredient & {count?: number}> | [];
    currentTab: TIngrType;
    isLoading: boolean;
}
const defaultState: TIngredientsReducerState = {
    arrIngredient: [],
    currentTab: "bun",
    isLoading: false
}

export const ingredientsReducer= (state = defaultState, action: TIngredientActions) => {
    let arr: Array<TIngredient & {count?: number}> ;
    let index: number;
    switch (action.type) {
        case INGREDIENTS_REQUEST:
            return {...state, isLoading: true, hasError: false };

        case INGREDIENTS_SUCCESS:
            return {...state, arrIngredient: [...action.payload.response.data], isLoading: false, hasError: false};

        case INGREDIENTS_ERROR:
            return {...state, isLoading: false, hasError: true };

        case CLEAR_INGREDIENT:
            return {...state, arrIngredient: []};

        case INCREMENT_COUNTER:
            //копируем массив
            arr = [ ...state.arrIngredient];
            //ищем элемент по индеку
            index = arr.findIndex((el => el._id === action.payload));
            // проверяем есть ли свойство, если да то инкриментируем его
            arr[index] = (arr[index].count !== undefined) ? ({...arr[index], count: Number(arr[index].count)+1}):({...arr[index], count: 1}) ;
            return {...state, arrIngredient: arr};

        case DECREMENT_COUNTER:
            //копируем массив
            arr = [ ...state.arrIngredient];
            //ищем элемент по индеку
            index = arr.findIndex((el => el._id === action.payload));
            // проверяем есть ли свойство, если да то декриментируем его && arr[index].count >0
            if(arr[index].count !== undefined ){
                arr[index] =  {...arr[index], count: Number(arr[index].count)-1};
            }

            return {...state, arrIngredient: arr};

        case SET_CURRENT:
            return {...state, currentTab: action.payload};

        case CLEAR_COUNTER:

            arr = [ ...state.arrIngredient];
            arr = arr.map(el=> {
                if(el.count !== undefined ) el.count = 0;
                return el;
            })
            return {...state, arrIngredient: arr};

        default:
            return state;
    }
}