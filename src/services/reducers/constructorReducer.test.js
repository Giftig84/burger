import {defaultState, constructorReducer} from "./constructorReducer";
import {ADD_INGREDIENT, CLEAR_INGREDIENTS, DELETE_INGREDIENT, SORT_INGREDIENT} from "../actions/constructorActions";

describe("Burger-constructor reducer", () => {
    it('test return state', () => {
        expect(constructorReducer(undefined, {})).toEqual(defaultState)
    });

    it('test add ingredient', () => {
        let result;
        const ingredientBun = [{ type: 'bun' }];
        const action = { type: ADD_INGREDIENT, payload: ingredientBun }
        result = constructorReducer(defaultState, action);
        expect(result.arrConstrIngr.length).toBe(1);

        result = constructorReducer(result, action);
        expect(result.arrConstrIngr.length).toBe(1);


        const ingredientNotBun = [{ type: 'sauce' }];
        const action2 = { type: ADD_INGREDIENT, payload: ingredientNotBun };
        result = constructorReducer(result, action2);
        expect(result.arrConstrIngr.length).toBe(2);
    });

    it('test delete ingredient', () => {
        let result;
        let ingredientWithId = [{ type: 'bun', id:'1' }];
        let action = { type: ADD_INGREDIENT, payload: ingredientWithId };
        result = constructorReducer(defaultState, action);
        expect(result.arrConstrIngr.length).toBe(1);
        ingredientWithId = [{ type: 'sauce', id:'2' }];
        action = { type: ADD_INGREDIENT, payload: ingredientWithId };

        result = constructorReducer(result, action);
        expect(result.arrConstrIngr.length).toBe(2);

        const actionDelete = { type: DELETE_INGREDIENT, payload: '1' };
        result = constructorReducer(result, actionDelete);
        expect(result.arrConstrIngr.length).toBe(1);
    })

    it('test clear ingredients', () => {
        let result;
        let ingredientWithId = [{ type: 'bun', id:'1' }];
        let action = { type: ADD_INGREDIENT, payload: ingredientWithId };
        result = constructorReducer(defaultState, action);
        expect(result.arrConstrIngr.length).toBe(1);
        ingredientWithId = [{ type: 'sauce', id:'2' }];
        action = { type: ADD_INGREDIENT, payload: ingredientWithId };

        result = constructorReducer(result, action);
        expect(result.arrConstrIngr.length).toBe(2);

        const actionClear = { type: CLEAR_INGREDIENTS };
        result = constructorReducer(result, actionClear);
        expect(result.arrConstrIngr.length).toBe(0);
    })

    it('test sort ingredients', () => {
        let result;
        let ingredientsArr = [{ type: 'bun', id:'1' }, { type: 'sauce', id:'2' }];
        let action = { type: SORT_INGREDIENT, payload: ingredientsArr };
        result = constructorReducer(defaultState, action);
        expect(result.arrConstrIngr.length).toBe(2);
    })

});