export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const SORT_INGREDIENT = "SORT_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";


export const addIngredientAction = (payload) => ({ type: ADD_INGREDIENT, payload });
export const sortIngredientAction = (payload) => ({ type: SORT_INGREDIENT, payload });
export const deleteConstructorItemAction = (payload) => ({ type: DELETE_INGREDIENT, payload });


