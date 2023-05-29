import {defaultState,  wsFeedReducer} from "./wsFeedReducer";
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/wsFeedsAction';

describe("Feed WebSocket tests", () => {
    it('test return state', () => {
        expect(wsFeedReducer(undefined, {})).toEqual(defaultState)
    });

    it('test connection success', () => {
        let action = {type: WS_CONNECTION_SUCCESS};
        expect(wsFeedReducer(defaultState, action)).toEqual({...defaultState,  error: undefined,  wsConnected: true});
    });

    it('test connection error', () => {
        let action = {type: WS_CONNECTION_ERROR,  payload: "ERROR 503"};
        expect(wsFeedReducer(defaultState, action)).toEqual({...defaultState,  error: "ERROR 503",  wsConnected: false});
    });

    it('test connection close', () => {
        let action = {type: WS_CONNECTION_CLOSED};
        expect(wsFeedReducer(defaultState, action)).toEqual({...defaultState,  error: undefined,
            wsConnected: false,
            feed: {
                success: false,
                orders: [],
                total: 0,
                totalToday: 0,
            }});
    });

    it('test get message', () => {
        let action = {type: WS_GET_MESSAGE,  payload: {
                success: true,
                orders: ["test", "test2"],
                total: 20,
                totalToday: 2,
            }};
        expect(wsFeedReducer(defaultState, action)).toEqual({...defaultState,  error: undefined,
            wsConnected: false,
            feed: {
                success: true,
                orders: ["test", "test2"],
                total: 20,
                totalToday: 2,
            }});
    });


});