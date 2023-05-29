import {defaultState, ingredientsReducer} from "./ingredientsReducer";
import {
    INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR,
    CLEAR_INGREDIENT, INCREMENT_COUNTER, DECREMENT_COUNTER, SET_CURRENT, CLEAR_COUNTER
} from "../actions/ingredientActions";

describe("Burger-Ingredients reducer", () => {
    it('test return state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(defaultState)
    });

    it('test request ingredient', () => {
        let action = {type: INGREDIENTS_REQUEST};
        expect(ingredientsReducer(defaultState, action)).toEqual({...defaultState, isLoading: true, hasError: false});
    });

    it('test request ingredient success', () => {
        let action = {
            type: INGREDIENTS_SUCCESS, payload: {
                response: {
                    data: [{type: 'bun', id: '1'}, {type: 'sauce', id: '2'}]
                }
            }
        };
        expect(ingredientsReducer(defaultState, action)).toEqual({
            ...defaultState,
            arrIngredient: [{type: 'bun', id: '1'}, {type: 'sauce', id: '2'}],
            isLoading: false,
            hasError: false
        });
    });

    it('test request error', () => {
        let action = {type: INGREDIENTS_ERROR};
        expect(ingredientsReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, hasError: true});
    });

    it('test clear ingredient', () => {
        let action = {
            type: INGREDIENTS_SUCCESS, payload: {
                response: {
                    data: [{type: 'bun', id: '1'}, {type: 'sauce', id: '2'}]
                }
            }
        };
        let result = ingredientsReducer(defaultState, action);
        expect(result.arrIngredient.length).toBe(2);
        action = {type: CLEAR_INGREDIENT};
        result = ingredientsReducer(result, action);
        expect(result.arrIngredient.length).toBe(0);

    });

    it('test increment counter', () => {
        let action = {
            type: INGREDIENTS_SUCCESS, payload: {
                response: {
                    data: [{type: 'bun', id: '1', _id: '1Z'}, {type: 'sauce', id: '2', _id: '2Z'}]
                }
            }
        };
        let result = ingredientsReducer(defaultState, action);
        expect(result.arrIngredient.length).toBe(2);
        action = {type: INCREMENT_COUNTER, payload: '2Z'};
        expect(ingredientsReducer(result, action)).toEqual({
            ...result,
            arrIngredient: [{type: 'bun', id: '1', _id: '1Z'}, {type: 'sauce', id: '2', _id: '2Z', count: 1}]
        });


    });

    it('test decrement counter', () => {
        let action = {
            type: INGREDIENTS_SUCCESS, payload: {
                response: {
                    data: [{type: 'bun', id: '1', _id: '1Z'}, {type: 'sauce', id: '2', _id: '2Z', count: 1}]
                }
            }
        };
        let result = ingredientsReducer(defaultState, action);
        expect(result.arrIngredient.length).toBe(2);
        action = {type: DECREMENT_COUNTER, payload: '2Z'};
        expect(ingredientsReducer(result, action)).toEqual({
            ...result,
            arrIngredient: [{type: 'bun', id: '1', _id: '1Z'}, {type: 'sauce', id: '2', _id: '2Z', count: 0}]
        });
    });

    it('test set Tab', () => {
        let action = {type: SET_CURRENT, payload: 'sauce'};
        expect(ingredientsReducer(defaultState, action)).toEqual({...defaultState, currentTab: 'sauce'});
    });

    it('test clear counter', () => {
        let action = {
            type: INGREDIENTS_SUCCESS, payload: {
                response: {
                    data: [{type: 'bun', id: '1', _id: '1Z', count: 5}, {type: 'sauce', id: '2', _id: '2Z', count: 10}]
                }
            }
        };
        let result = ingredientsReducer(defaultState, action);
        expect(result.arrIngredient.length).toBe(2);
        action = {type: CLEAR_COUNTER};
        expect(ingredientsReducer(result, action)).toEqual({
            ...result,
            arrIngredient: [{type: 'bun', id: '1', _id: '1Z', count: 0}, {type: 'sauce', id: '2', _id: '2Z', count: 0}]
        });
    });

});