import type { Middleware, MiddlewareAPI } from 'redux';
import {TRootState, TDispatch, TAllActions} from "../../Types/types";
import {refreshToken} from "../actions/userAction";


export type wsActionsTypes = {
    wsConnect: string,

    wsMessage?: string,
    wsOpen: string,
    wsClose: string,
    wsError: string,
    onMessage: string,
}

export const socketMiddleware = (wsActions: wsActionsTypes): Middleware => {
    return ((store: MiddlewareAPI<TDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TAllActions) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const {
                wsConnect,  wsMessage, wsOpen, wsClose, wsError, onMessage,
            } = wsActions

            if (wsConnect.match(type)) {
                console.log('Websocket connecting')
                socket = new WebSocket(payload);
            }
            if (socket) {

                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch({ type: wsOpen, payload: event });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch({ type: wsError, payload: event });
                    refreshToken();
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: onMessage, payload: JSON.parse(data) });
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch({ type: wsClose, payload: event });
                };

                if (wsMessage?.match(type) ) {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};