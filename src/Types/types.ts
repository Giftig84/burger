import {rootReducer, store} from "../services/store";
import {TConstructorActions} from "../services/actions/constructorActions";
import {TIngredientActions} from "../services/actions/ingredientActions";
import {TModalOrderAction} from "../services/actions/modalActions";
import {TModalDetailActions} from "../services/actions/modalDetailsActions";
import {TUserAction} from "../services/actions/userAction";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import {useDispatch as dispatchHook, TypedUseSelectorHook, useSelector} from "react-redux";
import {TWSFeedAction} from "../services/actions/wsFeedsAction";
import {TModalFeedOrderActions} from "../services/actions/modalFeedOrderActions";
import {TWSFeedProfileAction} from "../services/actions/wsFeedsProfileAction";
export type TOrderIngredient =  { id: string } & TIngredient;

export type TIngredient =  {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    title?: string
}

export type TOrderResp = {
    name: string;
    success: boolean;
    order: { number: number };
}
export type TAllActions = TConstructorActions | TIngredientActions | TModalOrderAction | TModalDetailActions | TUserAction | TWSFeedAction | TModalFeedOrderActions | TWSFeedProfileAction;
export type TDispatch = Dispatch<TAllActions>;

//export type TRootState = ReturnType<typeof store.getState>;

export type TRootState = ReturnType<typeof rootReducer>;

export type TUser = {
    name: string,
    email: string,
    password: string
}

export type TAppThunk<TReturn = void> = ActionCreator< ThunkAction<TReturn, Action, TRootState, TAllActions>  >;
//export type TAppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, TAllActions>;
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

//export const useDispatch = () => dispatchHook<TDispatch>();

export type TOrderResponse =  {
    success: boolean;
    orders: Array<TOrder> | [];
    total: number;
    totalToday: number;
};

export type TOrder = {
    ingredients: Array<string>;
    name: string;
    _id: string;
    status: 'created' | 'pending' | 'done';
    number: number;
    createdAt: string;
    updatedAt: string;
}



type AppDispatch<TReturnType = void> = (
    action: TAllActions | TAppThunk<TReturnType>
) => TReturnType;

export const useAppDispatch: () => AppDispatch = dispatchHook;