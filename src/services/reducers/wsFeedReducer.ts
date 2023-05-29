import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
     TWSFeedAction
} from '../actions/wsFeedsAction';
import type { TOrderResponse} from "../../Types/types";

export type TWSState = {
    wsConnected: boolean;
    feed: TOrderResponse;
    error?: Event;
}

export const defaultState:TWSState = {
    wsConnected: false,
    feed: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    }
};

// Создадим редьюсер для WebSocket
export const wsFeedReducer = (state = defaultState, action: TWSFeedAction) => {
    switch (action.type) {
        // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
        // Установим флаг wsConnected в состояние true
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        // Опишем обработку экшена с типом WS_CONNECTION_ERROR
        // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
        // Установим флаг wsConnected в состояние false
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                feed: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0,
                }
            };

        // Опишем обработку экшена с типом WS_GET_MESSAGE
        // Обработка происходит, когда с сервера возвращаются данные
        // В messages передадим данные, которые пришли с сервера
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,

                feed:  action.payload
            };
        default:
            return state;
    }
};