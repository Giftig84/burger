import type { Middleware, MiddlewareAPI } from 'redux';
import {TRootState, TDispatch, TAllActions} from "../../Types/types";
import {refreshToken} from "../actions/userAction";

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<TDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TAllActions) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === 'WS_CONNECTION_START') {
                // объект класса WebSocket
                socket = new WebSocket(payload);
            }
            if (socket) {

                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                    refreshToken();
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: 'WS_GET_MESSAGE', payload: JSON.parse(data) });
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                };

                if (type === 'WS_SEND_MESSAGE') {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};