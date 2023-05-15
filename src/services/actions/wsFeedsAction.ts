import { TOrderResponse} from "../../Types/types";

export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CLEAN_FEED: 'WS_CLEAN_FEED' = 'WS_CLEAN_FEED';

export interface IConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    payload: string;
}
export interface IGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    payload: TOrderResponse;
}

export interface IConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: Event;
}

export interface IConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IConnectionSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    payload: string;
}
export interface IConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export  type TWSFeedAction = IConnectionStartAction | IGetMessageAction | IConnectionErrorAction | IConnectionClosedAction
    | IConnectionSendMessageAction |IConnectionSuccessAction;

export const connectionStartAction = (payload: string): IConnectionStartAction => ({ type: WS_CONNECTION_START, payload });
