import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {ingredientsReducer} from "./reducers/ingredientsReducer";
import {constructorReducer} from "./reducers/constructorReducer";
import {modalReducer} from "./reducers/modalReducer";

const rootReducer = combineReducers({
    ingr: ingredientsReducer,
    modalOrder: modalReducer,
    constr: constructorReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));