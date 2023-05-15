import {
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_GET_MESSAGE,
    TWSFeedProfileAction
} from '../actions/wsFeedsProfileAction';
import type {TOrderResponse} from "../../Types/types";

type TWSState = {
    wsConnected: boolean;
    feedProfile: TOrderResponse;
    error?: Event;
}

const defaultState: TWSState = {
    wsConnected: false,
    feedProfile: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    }
};

// Создадим редьюсер для WebSocket
export const wsFeedProfileReducer = (state = defaultState, action: TWSFeedProfileAction) => {
    switch (action.type) {
        case WS_PROFILE_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_PROFILE_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_PROFILE_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                feedProfile: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0,
                }
            };
        case WS_PROFILE_GET_MESSAGE:
            return {
                ...state,
                error: undefined,

                feedProfile: action.payload
            };
        default:
            return state;
    }
};