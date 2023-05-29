import {defaultState, modalDetailsReducer} from "./modalDetailsReducer";
import {INGREDIENT_MODAL_REQUEST , INGREDIENT_MODAL_ERROR , INGREDIENT_MODAL_SUCCESS , UNSET_DETAILS} from "../actions/modalDetailsActions";


describe("ModalDetail reducer", () => {
    it('test return state', () => {
        expect(modalDetailsReducer(undefined, {})).toEqual(defaultState);
    });

    it('test modal request ingredient', () => {
        let action = {type: INGREDIENT_MODAL_REQUEST};
        expect(modalDetailsReducer(defaultState, action)).toEqual({...defaultState, isLoading: true, hasError: false});

    });

    it('test modal error request', () => {
        let action = {type: INGREDIENT_MODAL_ERROR};
        expect(modalDetailsReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, hasError: true});

    });

    it('test modal success and modal is true', () => {
        let action = {type: INGREDIENT_MODAL_SUCCESS, payload: {type: 'bun', id: '1'}};
        expect(modalDetailsReducer(defaultState, action)).toEqual({...defaultState, modalDetails: {type: 'bun', id: '1'}, isModal: true});

    });

    it('test clear modal details', () => {
        let action = {type: INGREDIENT_MODAL_SUCCESS, payload: {type: 'bun', id: '1'}};
        let result = modalDetailsReducer(defaultState, action);
        expect(result).toEqual({...defaultState, modalDetails: {type: 'bun', id: '1'}, isModal: true});

        action = {type: UNSET_DETAILS};
        expect(modalDetailsReducer(result, action)).toEqual({...result, modalDetails: undefined});

    });
});