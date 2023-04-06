import {BASE_URL, TOKEN_KEY} from "../../ImportFiles/endPointUrl";
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
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR";
export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_FGT_PSW_SUCCESS = "USER_FGT_PSW_SUCCESS";
export const USER_RST_PSW_SUCCESS = "USER_RST_PSW_SUCCESS";


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

        } catch (e) {
            dispatch({type: LOGIN_USER_ERROR});
            console.log('Возникла проблема с отправкой заказа: ' + LOGIN_USER_ERROR, e.message);
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
    } catch (e) {
        console.log('Возникла проблема с отправкой заказа: ' + LOGIN_USER_ERROR, e.message);
    }


}
 async function reqUser () {
    const token = getCookie(TOKEN_KEY);

    return  await fetch(BASE_URL + "/auth/user", {
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

export const getUser = () => {
    return async function (dispatch) {
        try {

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

export const updateUser = (userData) => {
    return async function (dispatch) {
        try {

            dispatch({type: USER_UPDATE_REQUEST})
            const token = getCookie(TOKEN_KEY);
            const parsedResponse =  await fetch(BASE_URL + "/auth/user", {
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
            ).then(checkResponse);;
            if (parsedResponse && parsedResponse.success) {
                dispatch({
                    type: USER_UPDATE_SUCCESS,
                    user: parsedResponse.user,
                })
            }
        } catch (e) {

            try {
                let parsedResponse =await refreshToken();
                if (parsedResponse && parsedResponse.success) {
                    setCookie('token', parsedResponse.accessToken, {path: '/'});
                    localStorage.setItem("refreshToken", parsedResponse.refreshToken);
                }
                parsedResponse =  await fetch(BASE_URL + "/auth/user", {
                        method: 'PATCH',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": getCookie(TOKEN_KEY)
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify(userData)
                    }
                ).then(checkResponse);;
                if (parsedResponse && parsedResponse.success) {
                    dispatch({
                        type: USER_UPDATE_SUCCESS,
                        user: parsedResponse.user,
                    })
                }
            } catch (e) {
                dispatch({type: USER_UPDATE_ERROR});
                console.log('Возникла проблема с обновлением юзера: ' + USER_UPDATE_ERROR, e.message);
            }

        }
    }
}
