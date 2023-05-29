import {defaultState, userReducer} from "./userReducer";
import {REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_SUCCESS, AUTH_USER_SUCCESS,
    AUTH_USER_REQUEST, AUTH_USER_ERROR, USER_LOGOUT_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_ERROR, USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS, USER_UPDATE_ERROR, USER_FGT_PSW_SUCCESS, USER_RST_PSW_SUCCESS} from "../actions/userAction";

describe("userReducer test", () => {
    it('test return state', () => {
        expect(userReducer(undefined, {})).toEqual(defaultState);
    });

    it('test register user request', () => {
        let action = {type: REGISTER_USER_REQUEST};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: true, isError: false});
    });

    it('test register user success', () => {
        let action = {type: REGISTER_USER_SUCCESS, user: {name: "TEST", email: "123@mail.ru"}};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: false, user: {name: "TEST", email: "123@mail.ru"}, isAuth: true, isChecked: true});
    });

    it('test register user error', () => {
        let action = {type: REGISTER_USER_ERROR};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: true, isChecked: true});
    });

    it('test login user success', () => {
        let action = {type: LOGIN_USER_SUCCESS, user: {name: "TEST", email: "123@mail.ru"}};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: false, user: {name: "TEST", email: "123@mail.ru"}, isAuth: true, isChecked: true});
    });

    it('test auth user success', () => {
        let action = {type: AUTH_USER_SUCCESS, user: {name: "TEST", email: "123@mail.ru"}};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: false, user: {name: "TEST", email: "123@mail.ru"}, isAuth: true});
    });

    it('test auth user request', () => {
        let action = {type: AUTH_USER_REQUEST};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: true, isError: false});
    });

    it('test auth user error', () => {
        let action = {type: AUTH_USER_ERROR};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: true, isChecked: true});
    });

    it('test logout user success', () => {
        let action = {type: AUTH_USER_SUCCESS, user: {name: "TEST", email: "123@mail.ru"}};
        let result = userReducer(defaultState, action);
        expect(result).toEqual({...defaultState, isLoading: false, isError: false, user: {name: "TEST", email: "123@mail.ru"}, isAuth: true});
        action = {type: USER_LOGOUT_SUCCESS};
        expect(userReducer(result, action)).toEqual({...result, isLoading: false, isError: false, user: {name: "", email: ""}, isAuth: false, isChecked: true});
    });

    it('test logout user request', () => {
        let action = {type: USER_LOGOUT_REQUEST};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: true, isError: false});
    });

    it('test logout user error', () => {
        let action = {type: USER_LOGOUT_ERROR};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: true, isChecked: true});
    });

    it('test update user request', () => {
        let action = {type: USER_UPDATE_REQUEST};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: true, isError: false});
    });

    it('test update user success', () => {
        let action = {type: USER_UPDATE_SUCCESS, user: {name: "TEST", email: "123@mail.ru"}};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: false, user: {name: "TEST", email: "123@mail.ru"}, isAuth: true, isChecked: true});
    });

    it('test update user error', () => {
        let action = {type: USER_UPDATE_ERROR};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: true, isChecked: true});
    });

    it('test forgot password success request', () => {
        let action = {type: USER_FGT_PSW_SUCCESS};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: false,  isResetPsw: true});
    });

    it('test reset password success request', () => {
        let action = {type: USER_RST_PSW_SUCCESS};
        expect(userReducer(defaultState, action)).toEqual({...defaultState, isLoading: false, isError: false,  isResetPsw: false});
    });
});