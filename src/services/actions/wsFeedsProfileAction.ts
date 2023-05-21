import { TOrderResponse} from "../../Types/types";

export const WS_PROFILE_CONNECTION_ERROR: 'WS_PROFILE_CONNECTION_ERROR' = 'WS_PROFILE_CONNECTION_ERROR';
export const WS_PROFILE_CONNECTION_CLOSED: 'WS_PROFILE_CONNECTION_CLOSED' = 'WS_PROFILE_CONNECTION_CLOSED';
export const WS_PROFILE_GET_MESSAGE: 'WS_PROFILE_GET_MESSAGE' = 'WS_PROFILE_GET_MESSAGE';
export const WS_PROFILE_SEND_MESSAGE: 'WS_PROFILE_SEND_MESSAGE' = 'WS_PROFILE_SEND_MESSAGE';
export const WS_PROFILE_CONNECTION_SUCCESS: 'WS_PROFILE_CONNECTION_SUCCESS' = 'WS_PROFILE_CONNECTION_SUCCESS';
export const WS_PROFILE_CONNECTION_START: 'WS_PROFILE_CONNECTION_START' = 'WS_PROFILE_CONNECTION_START';
export const WS_PROFILE_CLEAN_FEED: 'WS_PROFILE_CLEAN_FEED' = 'WS_PROFILE_CLEAN_FEED';

export interface IProfileConnectionStartAction {
    readonly type: typeof WS_PROFILE_CONNECTION_START;
    payload: string;
}
export interface IProfileGetMessageAction {
    readonly type: typeof WS_PROFILE_GET_MESSAGE;
    payload: TOrderResponse;
}

export interface IProfileConnectionErrorAction {
    readonly type: typeof WS_PROFILE_CONNECTION_ERROR;
    payload: Event;
}

export interface IProfileConnectionClosedAction {
    readonly type: typeof WS_PROFILE_CONNECTION_CLOSED;
}

export interface IProfileConnectionSendMessageAction {
    readonly type: typeof WS_PROFILE_SEND_MESSAGE;
    payload: string;
}
export interface IProfileConnectionSuccessAction {
    readonly type: typeof WS_PROFILE_CONNECTION_SUCCESS;
}

export  type TWSFeedProfileAction = IProfileConnectionStartAction | IProfileGetMessageAction | IProfileConnectionErrorAction | IProfileConnectionClosedAction
    | IProfileConnectionSendMessageAction | IProfileConnectionSuccessAction;

export const connectionStartProfileAction = (payload: string): IProfileConnectionStartAction => ({ type: WS_PROFILE_CONNECTION_START, payload });
