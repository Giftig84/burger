export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const SORT_INGREDIENT = "SORT_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const CLEAR_ORDER = "CLEAR_ORDER";

export const addIngredientAction = (payload) => ({ type: ADD_INGREDIENT, payload });
export const sortIngredientAction = (payload) => ({ type: SORT_INGREDIENT, payload });
export const deleteConstructorItemAction = (payload) => ({ type: DELETE_INGREDIENT, payload });


