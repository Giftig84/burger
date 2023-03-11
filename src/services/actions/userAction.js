import {BASE_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse, setCookie} from "../../Utils/Utils";
import {getCookie, deleteCookie} from "../../Utils/Utils";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const AUTH_USER_ERROR = "AUTH_USER_ERROR";
export const AUTH_USER_REQUEST = "AUTH_USER_REQUEST";
export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";

//регистрация
export const userRegistration = (url = '/auth/register', body) => {
    return async function (dispatch) {
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

        } catch (e) {
            dispatch({type: REGISTER_USER_ERROR});
            console.log('Возникла проблема с отправкой заказа: ' + REGISTER_USER_ERROR, e.message);
        }
    }
}

//авторизация
export const loginUser = (url = '/auth/login', body) => {
    return async function (dispatch) {
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
                localStorage.setItem("refreshToken", parsedResponse.refreshToken);
                setCookie('token', parsedResponse.accessToken);
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    user: parsedResponse.user,
                })
            } else {
                console.log(parsedResponse.message)
                dispatch({type: LOGIN_USER_ERROR})
            }

        } catch (e) {
            dispatch({type: LOGIN_USER_ERROR});
            console.log('Возникла проблема с отправкой заказа: ' + LOGIN_USER_ERROR, e.message);
        }
    }
}
//обновление токена
export  async function refreshToken () {
    try {
        const token =  localStorage.getItem("refreshToken");
        return  await fetch(BASE_URL + "/auth/token", {
            method: 'POST',
            body: JSON.stringify({
                token: token,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkResponse).then(parsedResponse => parsedResponse);
    } catch (e) {
        console.log('Возникла проблема с отправкой заказа: ' + LOGIN_USER_ERROR, e.message);
    }


}
 async function reqUser () {
    const token = getCookie('token');

    return  await fetch(BASE_URL + "/auth/user", {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }
    ).then(checkResponse);


}

export const getUser = () => {
    return async function (dispatch) {
        try {
            debugger;
            dispatch({type: AUTH_USER_REQUEST})
            const parsedResponse = await reqUser();
            if (parsedResponse && parsedResponse.success) {
                dispatch({
                    type: AUTH_USER_SUCCESS,
                    user: parsedResponse.user,
                })
            }
        } catch (e) {
            try {
                await refreshToken();
                const parsedResponse = await reqUser();
                if (parsedResponse && parsedResponse.success) {
                    dispatch({
                        type: AUTH_USER_SUCCESS,
                        user: parsedResponse.user,
                    })
                }
            } catch (e) {
                dispatch({type: AUTH_USER_ERROR});
                console.log('Возникла проблема с отправкой заказа: ' + LOGIN_USER_ERROR, e.message);
            }
        }
    }
}


export function userLogout() {

    return async function (dispatch) {
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
                    deleteCookie("token")
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
