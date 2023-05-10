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

const rootReducer = combineReducers({
    ingr: ingredientsReducer,
    modalOrder: modalReducer,
    constr: constructorReducer,
    user: userReducer,
    modal: modalDetailsReducer,
    feedAll: wsFeedReducer,
    modalFeedOrder: modalFeedOrderReducer

})

export const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
        applyMiddleware(socketMiddleware())
    )

);