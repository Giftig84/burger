import {BASE_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse} from "../../Utils/Utils";
import {TIngrType} from "../../components/BurgerIngredients/IngrSection/IngrSection";
import {TAppThunk, TDispatch} from "../../Types/types";


export const INGREDIENTS_REQUEST: 'INGREDIENTS_REQUEST' = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS: 'INGREDIENTS_SUCCESS' = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR: 'INGREDIENTS_ERROR' = "INGREDIENTS_ERROR";
export const INCREMENT_COUNTER: 'INCREMENT_COUNTER' = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER: 'DECREMENT_COUNTER' = "DECREMENT_COUNTER";
export const SET_CURRENT: 'SET_CURRENT' = "SET_CURRENT";
export const CLEAR_INGREDIENT: 'CLEAR_INGREDIENT' = "CLEAR_INGREDIENT";
export const CLEAR_COUNTER: 'CLEAR_COUNTER' = "CLEAR_COUNTER";

interface IIncrementCounterAction {
    readonly type: typeof INCREMENT_COUNTER;
    payload: string;
}
interface IDecrementCounterAction {
    readonly type: typeof DECREMENT_COUNTER;
    payload: string;
}

interface ISetCurrentTabAction {
    readonly type: typeof SET_CURRENT;
    payload: TIngrType;
}
interface IIngredientsRequest {
    readonly type: typeof INGREDIENTS_REQUEST;
}
interface IClearCounter {
    readonly type: typeof CLEAR_COUNTER;
}
interface IIngredientsError {
    readonly type: typeof INGREDIENTS_ERROR;
}

interface IIngredientsSuccess {
    readonly type: typeof INGREDIENTS_SUCCESS;
    payload: any;
}

interface IIngredientsClear {
    readonly type: typeof CLEAR_INGREDIENT;
}


export type TIngredientActions = IIncrementCounterAction | IDecrementCounterAction | ISetCurrentTabAction | IIngredientsRequest
    | IIngredientsError | IIngredientsSuccess | IIngredientsClear | any | IClearCounter;

export const incrementCounterAction = (payload: string): IIncrementCounterAction => ({ type: INCREMENT_COUNTER, payload });
export const decrementCounterAction = (payload: string): IDecrementCounterAction => ({ type: DECREMENT_COUNTER, payload });
export const setCurrentTabAction = (payload: TIngrType): ISetCurrentTabAction => ({ type: SET_CURRENT, payload });

export const fetchIngredientRequest: TAppThunk = (url: string) => (dispatch: TDispatch) =>  {
        try{
             fetch(BASE_URL + url).then(checkResponse).then(parsedResponse =>{
                dispatch({type: INGREDIENTS_SUCCESS, payload: {response: parsedResponse }});
            });
            //let request = {type: INGREDIENTS_SUCCESS, payload: {response: parsedResponse }};
          //  ;

        } catch (e: unknown) {
            dispatch({type: INGREDIENTS_ERROR});
            if(e instanceof Error) {
                console.log('Возникла проблема с запросом ингредиентов: ' + INGREDIENTS_SUCCESS, e.message);
            }
            dispatch({type: CLEAR_INGREDIENT});
        }
    }


