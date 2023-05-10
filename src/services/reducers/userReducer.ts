import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_SUCCESS,
    AUTH_USER_SUCCESS,
    AUTH_USER_REQUEST,
    AUTH_USER_ERROR,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_ERROR,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_ERROR, USER_FGT_PSW_SUCCESS, USER_RST_PSW_SUCCESS, TUserAction, TUserRedux
} from "../actions/userAction";

type TUserState = {
    user: TUserRedux | {};
    isLoading: boolean;
    isError: boolean;
    isAuth: boolean;
    isResetPsw: boolean;
}
const defaultState: TUserState = {
    user: {},
    isLoading: false,
    isError: false,
    isAuth: false,
    isResetPsw: false

}

export const userReducer = (state = defaultState, action: TUserAction) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, isLoading: true, isError: false};
        case REGISTER_USER_SUCCESS:
            return {...state, isLoading: false, isError: false, user: action.user, isAuth: true};
        case REGISTER_USER_ERROR:
            return {...state, isLoading: false, isError: true};
        case LOGIN_USER_SUCCESS:
            return {...state, isLoading: false, isError: false, user: action.user, isAuth: true};
        case AUTH_USER_SUCCESS:
            return {...state, isLoading: false, isError: false, user: action.user, isAuth: true};
        case AUTH_USER_REQUEST:
            return {...state, isLoading: true, isError: false};
        case AUTH_USER_ERROR:
            return {...state, isLoading: false, isError: true};
        case USER_LOGOUT_SUCCESS:
            return {...state, isLoading: false, isError: false, user: {}, isAuth: false};
        case USER_LOGOUT_REQUEST:
            return {...state, isLoading: true, isError: false};
        case USER_LOGOUT_ERROR:
            return {...state, isLoading: false, isError: true};
        case USER_UPDATE_REQUEST:
            return {...state, isLoading: true, isError: false};
        case USER_UPDATE_SUCCESS:
            return {...state, isLoading: false, isError: false, user: action.user, isAuth: true};
        case USER_UPDATE_ERROR:
            return {...state, isLoading: false, isError: true};
        case USER_FGT_PSW_SUCCESS:
            return {...state, isLoading: false, isError: false,  isResetPsw: true};
        case USER_RST_PSW_SUCCESS:
            return {...state, isLoading: false, isError: false,  isResetPsw: false};
        default:
            return state;
    }
}