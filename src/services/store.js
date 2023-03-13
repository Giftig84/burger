import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {ingredientsReducer} from "./reducers/ingredientsReducer";
import {constructorReducer} from "./reducers/constructorReducer";
import {modalReducer} from "./reducers/modalReducer";
import {userReducer} from "./reducers/userReducer";
import {modalDetailsReducer} from "./reducers/modalDetailsReducer";

const rootReducer = combineReducers({
    ingr: ingredientsReducer,
    modalOrder: modalReducer,
    constr: constructorReducer,
    user: userReducer,
    modal: modalDetailsReducer

})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));