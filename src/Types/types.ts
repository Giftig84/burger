import {store} from "../services/store";
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
    __v: number
}

export type TOrderResp = {
    name: string;
    success: boolean;
    order: { number: number };
}

export type TDispatch = typeof store.dispatch;

export type TUser = {
    name: string,
    email: string,
    password: string
}