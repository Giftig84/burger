import React, {FC} from 'react';
import s from './Page.module.css'
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate,  useNavigate} from "react-router-dom";
import {BASE_URL} from "../ImportFiles/endPointUrl";
import {checkResponse} from "../Utils/Utils";
import { rstPswSelector} from "../services/selectors/selectors";
import {USER_RST_PSW_SUCCESS} from "../services/actions/userAction";
import {TDispatch} from "../Types/types";

export const ResetPassword:FC = () =>  {
    const [showPass, setShowPass] = React.useState<boolean>(false);
    const [emailCode, setEmailCode] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const navigate = useNavigate();
    const isRstPWD: boolean | undefined = useSelector(rstPswSelector);
    const dispatch: TDispatch = useDispatch();

    if (!isRstPWD) {
        return (
            <Navigate to='/forgot-password' />
        );
    }

    const resetPassword = async function () {
        if (password && emailCode) {

            try {
                const parsedResponse = await fetch(BASE_URL + "/password-reset/reset", {
                    body: JSON.stringify({
                        "password": password,
                        "token": emailCode
                    }),
                    headers: new Headers([
                        ['Content-Type', 'application/json'],
                    ]),
                    method: 'POST',
                }).then(checkResponse);
                if (parsedResponse.success === true) {
                    dispatch({type: USER_RST_PSW_SUCCESS})
                    navigate('/login');
                }

            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.log('Возникла проблема с сбросом пароля: ', e.message);
                }
            }
        }

    }
    const onIconClick = () => {
        setShowPass(!showPass);
    }
    return (
        <div className={s.main}>
            <div className={s.header + " mt-10 mb-6"}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
            </div>
            <Input
                type={(!showPass) ? 'password':'text'}
                placeholder={'Введите новый пароль'}
                onChange={e => setPassword(e.target.value)}
                icon={'ShowIcon'}
                onIconClick={onIconClick}
                value={password}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setEmailCode(e.target.value)}
                value={emailCode}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium" onClick={resetPassword}>
                Сохранить
            </Button>
            <div className={s.bottom + " mt-20 "}>
                <p className="text text_type_main-default text_color_inactive mr-4">Вспомнили пароль?</p>
                <Link to={{pathname: `/login`}} className="text text_type_main-default">Войти</Link>
            </div>


        </div>

    )
}