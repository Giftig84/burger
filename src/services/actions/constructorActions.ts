import {TOrderIngredient} from "../../Types/types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = "ADD_INGREDIENT";
export const SORT_INGREDIENT: 'SORT_INGREDIENT' = "SORT_INGREDIENT";
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = "DELETE_INGREDIENT";

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    payload: Array<TOrderIngredient>;
}

export interface ISortIngredientAction {
    readonly type: typeof SORT_INGREDIENT;
    payload: Array<TOrderIngredient>;
}

export interface IDeleteConstructorItemAction {
    readonly type: typeof DELETE_INGREDIENT;
    payload: string;
}
export type TConstructorActions = IAddIngredientAction | ISortIngredientAction | IDeleteConstructorItemAction;

export const addIngredientAction = (payload: Array<TOrderIngredient>): IAddIngredientAction => ({ type: ADD_INGREDIENT, payload });
export const sortIngredientAction = (payload: Array<TOrderIngredient>): ISortIngredientAction => ({ type: SORT_INGREDIENT, payload });
export const deleteConstructorItemAction = (payload: string): IDeleteConstructorItemAction => ({ type: DELETE_INGREDIENT, payload });


