import {BASE_URL, TOKEN_KEY} from "../../ImportFiles/endPointUrl";
import {checkResponse, setCookie} from "../../Utils/Utils";
import {getCookie, deleteCookie} from "../../Utils/Utils";
import { TDispatch, TUser} from "../../Types/types";

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR: 'REGISTER_USER_ERROR' = "REGISTER_USER_ERROR";
export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR: 'LOGIN_USER_ERROR' = "LOGIN_USER_ERROR";
export const AUTH_USER_ERROR: 'AUTH_USER_ERROR' = "AUTH_USER_ERROR";
export const AUTH_USER_REQUEST: 'AUTH_USER_REQUEST' = "AUTH_USER_REQUEST";
export const AUTH_USER_SUCCESS: 'AUTH_USER_SUCCESS' = "AUTH_USER_SUCCESS";
export const USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS' = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST' = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_ERROR: 'USER_LOGOUT_ERROR' = "USER_LOGOUT_ERROR";
export const USER_UPDATE_ERROR: 'USER_UPDATE_ERROR' = "USER_UPDATE_ERROR";
export const USER_UPDATE_REQUEST: 'USER_UPDATE_REQUEST' = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS' = "USER_UPDATE_SUCCESS";
export const USER_FGT_PSW_SUCCESS: 'USER_FGT_PSW_SUCCESS' = "USER_FGT_PSW_SUCCESS";
export const USER_RST_PSW_SUCCESS: 'USER_RST_PSW_SUCCESS' = "USER_RST_PSW_SUCCESS";

export type TUserRedux = Omit<TUser, "password">;
export interface IRegUserRequest {
    readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegUserSuccess {
    readonly type: typeof REGISTER_USER_SUCCESS;
    user: TUserRedux;
}
export interface IRegUserError {
    readonly type: typeof REGISTER_USER_ERROR;
}
interface ILoginUserRequest {
    readonly type: typeof LOGIN_USER_REQUEST;
}
interface ILoginUserSuccess {
    readonly  type: typeof LOGIN_USER_SUCCESS;
    user: TUserRedux;
}
interface  ILoginUserError {
    readonly type: typeof LOGIN_USER_ERROR;
}
interface IAuthUserRequest {
    readonly  type: typeof  AUTH_USER_REQUEST;
}
interface IAuthUserSuccess {
    readonly  type: typeof AUTH_USER_SUCCESS;
    user: TUserRedux;
}
interface  IAuthUserError {
    readonly type: typeof AUTH_USER_ERROR;
}
interface ILogOutUserRequest {
    readonly  type: typeof  USER_LOGOUT_REQUEST;
}
interface ILogOutUserSuccess {
    readonly  type: typeof USER_LOGOUT_SUCCESS;
}
interface  ILogOutUserError {
    readonly type: typeof USER_LOGOUT_ERROR;
}
interface IUpdateUserRequest {
    readonly  type: typeof  USER_UPDATE_REQUEST;
}
interface IUpdateUserSuccess {
    readonly  type: typeof USER_UPDATE_SUCCESS;
    user: TUserRedux;
}
interface  IUpdateUserError {
    readonly type: typeof USER_UPDATE_ERROR;
}
interface  IForgetUserPwd {
    readonly type: typeof USER_FGT_PSW_SUCCESS;
}
interface  IResetUserPwd {
    readonly type: typeof USER_RST_PSW_SUCCESS;
}

export type TUserAction = IResetUserPwd | IForgetUserPwd | IUpdateUserError | IUpdateUserSuccess | IUpdateUserRequest |
    ILogOutUserError | ILogOutUserSuccess | ILogOutUserRequest | IAuthUserError | IAuthUserSuccess | IAuthUserRequest |
    ILoginUserError | ILoginUserSuccess | ILoginUserRequest | IRegUserError | IRegUserSuccess | IRegUserRequest;


//регистрация
export const userRegistration = (url: string = '/auth/register', body: TUser) => {
    return async function (dispatch: TDispatch) {
        try {
            dispatch({type: REGISTER_USER_REQUEST})
            const parsedResponse = await fetch(BASE_URL + url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(checkResponse);

            if (parsedResponse && parsedResponse.success) {
                localStorage.setItem("refreshToken", parsedResponse.refreshToken);
                setCookie('token', parsedResponse.accessToken);
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    user: parsedResponse.user,
                })
            } else {
                console.log(parsedResponse.message)
                dispatch({type: REGISTER_USER_ERROR})
            }

        } catch (e: unknown) {
            dispatch({type: REGISTER_USER_ERROR});
            if( e instanceof Error){
                console.log('Возникла проблема с отправкой заказа: ' + REGISTER_USER_ERROR, e.message);
            }

        }
    }
}

//авторизация
export const loginUser = (url = '/auth/login', body: Pick<TUser, "email" | "password">)=> {
    return async function (dispatch: TDispatch) {
        try {
            dispatch({type: LOGIN_USER_REQUEST})
            const parsedResponse = await fetch(BASE_URL + url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(checkResponse);

            if (parsedResponse && parsedResponse.success) {

                setCookie('token', parsedResponse.accessToken,  { path: '/' });
                localStorage.setItem("refreshToken", parsedResponse.refreshToken);
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    user: parsedResponse.user,
                })
            } else {
                console.log(parsedResponse.message)
                dispatch({type: LOGIN_USER_ERROR})
            }

        } catch (e: unknown) {
            dispatch({type: LOGIN_USER_ERROR});
            if(e instanceof  Error){
                console.log('Возникла проблема с отправкой заказа: ' + LOGIN_USER_ERROR, e.message);
            }

        }
    }
}
//обновление токена
export  async function refreshToken () {
    try {
        const refreshToken =  localStorage.getItem("refreshToken");
        return  await fetch(BASE_URL + "/auth/token", {
            method: 'POST',
            body: JSON.stringify({
                token: refreshToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkResponse).then(parsedResponse => parsedResponse);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log('Возникла проблема с отправкой заказа: ' + LOGIN_USER_ERROR, e.message);
        }
    }


}

async function reqUser() {
    const token = getCookie(TOKEN_KEY);

    if (token !== undefined) {
        return await fetch(BASE_URL + "/auth/user", {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            }
        ).then(checkResponse);
    }
}

export const getUser = () => {
    return async function (dispatch: TDispatch) {
        try {
            const token = getCookie(TOKEN_KEY);
            if (token !== undefined) {
                dispatch({type: AUTH_USER_REQUEST})
                const parsedResponse = await reqUser();
                if (parsedResponse && parsedResponse.success) {
                    dispatch({
                        type: AUTH_USER_SUCCESS,
                        user: parsedResponse.user,
                    })
                }
            } else { dispatch({type: AUTH_USER_ERROR});}
        } catch (e) {
            try {
                let parsedResponse =await refreshToken();
                if (parsedResponse && parsedResponse.success) {
                    setCookie('token', parsedResponse.accessToken, {path: '/'});
                    localStorage.setItem("refreshToken", parsedResponse.refreshToken);
                }
                parsedResponse = await reqUser();
                if (parsedResponse && parsedResponse.success) {
                    dispatch({
                        type: AUTH_USER_SUCCESS,
                        user: parsedResponse.user,
                    })
                }
            } catch (e:unknown) {
                dispatch({type: AUTH_USER_ERROR});
                if(e instanceof Error)
                console.log('Возникла проблема с отправкой заказа: ' + LOGIN_USER_ERROR, e.message);
            }
        }
    }
}


export function userLogout() {

    return async function (dispatch: TDispatch) {
        dispatch({
            type: USER_LOGOUT_REQUEST
        });
        fetch(BASE_URL + "/auth/logout", {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkResponse)
            .then((parsedResponse) => {
                if (parsedResponse && parsedResponse.success) {
                    deleteCookie(TOKEN_KEY, "/");
                    localStorage.removeItem("refreshToken");
                    dispatch({
                        type: USER_LOGOUT_SUCCESS
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: USER_LOGOUT_ERROR,
                    err
                });
            })
    }
}

//обновление данных о пользователе

export const updateUser = (userData: TUser) => {
    return async function (dispatch: TDispatch) {
        try {

            dispatch({type: USER_UPDATE_REQUEST})
            const token = getCookie(TOKEN_KEY);
            if (token !== undefined) {
                const parsedResponse = await fetch(BASE_URL + "/auth/user", {
                        method: 'PATCH',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify(userData)
                    }
                ).then(checkResponse);
                if (parsedResponse && parsedResponse.success) {
                    dispatch({
                        type: USER_UPDATE_SUCCESS,
                        user: parsedResponse.user,
                    })
                }
            }
        } catch (e) {

            try {
                let parsedResponse =await refreshToken();
                if (parsedResponse && parsedResponse.success) {
                    setCookie('token', parsedResponse.accessToken, {path: '/'});
                    localStorage.setItem("refreshToken", parsedResponse.refreshToken);
                }
                const token = getCookie(TOKEN_KEY);
                if (token !== undefined)
                parsedResponse =  await fetch(BASE_URL + "/auth/user", {
                        method: 'PATCH',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify(userData)
                    }
                ).then(checkResponse);
                if (parsedResponse && parsedResponse.success) {
                    dispatch({
                        type: USER_UPDATE_SUCCESS,
                        user: parsedResponse.user,
                    })
                }
            } catch (e: unknown) {
                dispatch({type: USER_UPDATE_ERROR});
                if(e instanceof Error)
                console.log('Возникла проблема с обновлением юзера: ' + USER_UPDATE_ERROR, e.message);
            }

        }
    }
}
