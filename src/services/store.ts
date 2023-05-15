import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {ingredientsReducer} from "./reducers/ingredientsReducer";
import {constructorReducer} from "./reducers/constructorReducer";
import {modalReducer} from "./reducers/modalReducer";
import {userReducer} from "./reducers/userReducer";
import {modalDetailsReducer} from "./reducers/modalDetailsReducer";
import {socketMiddleware} from "./Middleware/FeedMiddleware";
import {wsFeedReducer} from "./reducers/wsFeedReducer";
import {modalFeedOrderReducer} from "./reducers/modalFeedOrderReducer";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE, WS_SEND_MESSAGE
} from "./actions/wsFeedsAction";
import {wsFeedProfileReducer} from "./reducers/wsFeedProfileReducer";
import {
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_START, WS_PROFILE_CONNECTION_SUCCESS, WS_PROFILE_GET_MESSAGE,
    WS_PROFILE_SEND_MESSAGE
} from "./actions/wsFeedsProfileAction";

export const rootReducer = combineReducers({
    ingr: ingredientsReducer,
    modalOrder: modalReducer,
    constr: constructorReducer,
    user: userReducer,
    modal: modalDetailsReducer,
    feedAll: wsFeedReducer,
    modalFeedOrder: modalFeedOrderReducer,
    feedProfile: wsFeedProfileReducer,

})

const wsAllFeedActions = {
    wsConnect: WS_CONNECTION_START,
    wsMessage: WS_SEND_MESSAGE,
    wsOpen: WS_CONNECTION_SUCCESS,
    wsClose: WS_CONNECTION_CLOSED,
    wsError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
}

const wsFeedProfileActions = {
    wsConnect: WS_PROFILE_CONNECTION_START,
    wsMessage: WS_PROFILE_SEND_MESSAGE,
    wsOpen: WS_PROFILE_CONNECTION_SUCCESS,
    wsClose: WS_PROFILE_CONNECTION_CLOSED,
    wsError: WS_PROFILE_CONNECTION_ERROR,
    onMessage: WS_PROFILE_GET_MESSAGE,
}


export const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
        applyMiddleware(socketMiddleware(wsAllFeedActions)),
        applyMiddleware(socketMiddleware(wsFeedProfileActions))
    )

);