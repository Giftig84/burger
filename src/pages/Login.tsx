import React, {FC} from 'react';
import  s from './Page.module.css'
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import { Navigate , Link } from "react-router-dom";
import {authSelector} from "../services/selectors/selectors";
import {loginUser} from "../services/actions/userAction";
import {TDispatch} from "../Types/types";

export  const  Login:FC = ()=> {

    const [emailValue, setEmailValue] = React.useState<string>('');
    const [passValue, setPassValue] = React.useState<string>('');
    const dispatch: TDispatch = useDispatch();
    const isAuth: boolean | undefined = useSelector(authSelector);

    const login = ((e: React.SyntheticEvent) => {
        e.preventDefault();
        const userData = {
            email: emailValue,
            password: passValue,
        }
        dispatch(loginUser ('/auth/login',userData));
        setEmailValue('');
        setPassValue('');
    });

    if (isAuth) {
        return (
            <Navigate to='/' />
        );
    }
    return(
        <div className={s.main}>
            <div className={s.header +" mt-10 mb-6"}>
                <p className="text text_type_main-medium">Вход</p>
            </div>
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={e => setEmailValue(e.target.value)}
                value={emailValue}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={e => setPassValue(e.target.value)}
                icon={'ShowIcon'}
                value={passValue}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium" onClick={e => login(e)}>
                Войти
            </Button>
            <div className={s.bottom + " mt-20 "} >
                <p className="text text_type_main-default text_color_inactive mr-4">Вы новый пользователь?</p>
                <Link to={{ pathname: `/register` }} className="text text_type_main-default">Зарегестрироваться</Link>
            </div>
            <div className={s.bottom + " mt-4 "} >
                <p className="text text_type_main-default text_color_inactive mr-4">Забыли пароль?</p>
                <Link to={{ pathname: `/forgot-password` }} className="text text_type_main-default">Восстановить пароль</Link>
            </div>

        </div>

    )
}