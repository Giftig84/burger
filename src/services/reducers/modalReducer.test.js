import {defaultState, modalReducer} from "./modalReducer";
import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR, CLEAR_ORDER} from "../actions/modalActions";

describe("Modal reducer", () => {
    it('test return state', () => {
        expect(modalReducer(undefined, {})).toEqual(defaultState);
    });

    it('test order request', () => {
        let action = {type: ORDER_REQUEST};
        expect(modalReducer(defaultState, action)).toEqual({...defaultState, isLoading: true, hasError: false});
    });

    it('test order request success', () => {
        let action = {
            type: ORDER_SUCCESS, payload: {
                "response": {
                    "name": "test",
                    "order": {
                        "number": 123
                    },
                    "success": "true"
                }
            }
        };
        expect(modalReducer(defaultState, action)).toEqual({...defaultState, orderResponse: {
                "name": "test",
                "order": {
                    "number": 123
                },
                "success": "true"
            }, isLoading: false, hasError: false});
    });

    it('test order request error', () => {
        let action = {type: ORDER_ERROR};
        expect(modalReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, hasError: true});
    });

    it('test clear order request', () => {
        let action = {
            type: ORDER_SUCCESS, payload: {
                "response": {
                    "name": "test",
                    "order": {
                        "number": 123
                    },
                    "success": "true"
                }
            }
        };
        let result = modalReducer(defaultState, action);
        expect(result).toEqual({...defaultState, orderResponse: {
                "name": "test",
                "order": {
                    "number": 123
                },
                "success": "true"
            }, isLoading: false, hasError: false});

        action = {type: CLEAR_ORDER};
        expect(modalReducer(result, action)).toEqual({...result, orderResponse: {
                "name": "",
                "order": {
                    "number": 0
                },
                "success": ""
            }});
    });
});