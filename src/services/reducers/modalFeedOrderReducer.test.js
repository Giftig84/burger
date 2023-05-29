import {defaultState, modalFeedOrderReducer} from "./modalFeedOrderReducer";
import {ORDER_MODAL_REQUEST ,ORDER_MODAL_ERROR, ORDER_MODAL_SUCCESS, UNSET_ORDER_DETAILS} from "../actions/modalFeedOrderActions";

describe("modalFeedOrderReducer test", () => {
    it('test return state', () => {
        expect(modalFeedOrderReducer(undefined, {})).toEqual(defaultState)
    });

    it('test modal request feed', () => {
        let action = {type: ORDER_MODAL_REQUEST};
        expect(modalFeedOrderReducer(defaultState, action)).toEqual({...defaultState, isLoading: true, hasError: false});

    });

    it('test modal error', () => {
        let action = {type: ORDER_MODAL_ERROR};
        expect(modalFeedOrderReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, hasError: true});

    });

    it('test modal success and modal is true', () => {
        let action = {type: ORDER_MODAL_SUCCESS, payload: [{name: 'bun', _id: '1', status: 'pending'}, {name: 'sauce', _id: '2', status: 'pending'}]};
        expect(modalFeedOrderReducer(defaultState, action)).toEqual({...defaultState, modalDetails: [{name: 'bun', _id: '1', status: 'pending'}, {name: 'sauce', _id: '2', status: 'pending'}], isModal: true,  isLoading: false});

    });

    it('test modal success and modal is true', () => {
        let action = {type: ORDER_MODAL_SUCCESS, payload: [{name: 'bun', _id: '1', status: 'pending'}, {name: 'sauce', _id: '2', status: 'pending'}]};
        let result = modalFeedOrderReducer(defaultState, action);
        expect(result).toEqual({...defaultState, modalDetails: [{name: 'bun', _id: '1', status: 'pending'}, {name: 'sauce', _id: '2', status: 'pending'}], isModal: true,  isLoading: false});
        action = {type: UNSET_ORDER_DETAILS};
        expect(modalFeedOrderReducer(result, action)).toEqual({...result, modalDetails: []});
    });


});