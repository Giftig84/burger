import {defaultState, wsFeedProfileReducer} from "./wsFeedProfileReducer";
import {WS_PROFILE_CONNECTION_SUCCESS, WS_PROFILE_CONNECTION_ERROR, WS_PROFILE_CONNECTION_CLOSED, WS_PROFILE_GET_MESSAGE} from "../actions/wsFeedsProfileAction";

describe("Feed Profile WebSocket tests", () => {
    it('test return state', () => {
        expect(wsFeedProfileReducer(undefined, {})).toEqual(defaultState)
    });

    it('test connection success', () => {
        let action = {type: WS_PROFILE_CONNECTION_SUCCESS};
        expect(wsFeedProfileReducer(defaultState, action)).toEqual({...defaultState,  error: undefined,  wsConnected: true});
    });

    it('test connection error', () => {
        let action = {type: WS_PROFILE_CONNECTION_ERROR,  payload: "ERROR 503"};
        expect(wsFeedProfileReducer(defaultState, action)).toEqual({...defaultState,  error: "ERROR 503",  wsConnected: false});
    });

    it('test connection close', () => {
        let action = {type: WS_PROFILE_CONNECTION_CLOSED};
        expect(wsFeedProfileReducer(defaultState, action)).toEqual({...defaultState,  error: undefined,
            wsConnected: false,
            feedProfile: {
                success: false,
                orders: [],
                total: 0,
                totalToday: 0,
            }});
    });

    it('test get message', () => {
        let action = {type: WS_PROFILE_GET_MESSAGE,  payload: {
                success: true,
                orders: ["test", "test2"],
                total: 20,
                totalToday: 2,
            }};
        expect(wsFeedProfileReducer(defaultState, action)).toEqual({...defaultState,  error: undefined,
            wsConnected: false,
            feedProfile: {
                success: true,
                orders: ["test", "test2"],
                total: 20,
                totalToday: 2,
            }});
    });


});