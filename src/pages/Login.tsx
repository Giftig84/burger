import React, {FC, FormEventHandler} from 'react';
import  s from './Page.module.css'
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigate , Link } from "react-router-dom";
import {authSelector} from "../services/selectors/selectors";
import {loginUser} from "../services/actions/userAction";
import { useAppDispatch, useAppSelector} from "../Types/types";

export  const  Login:FC = ()=> {

    const [emailValue, setEmailValue] = React.useState<string>('');
    const [passValue, setPassValue] = React.useState<string>('');
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(authSelector);

    const login: FormEventHandler<HTMLFormElement>  = ((e: React.SyntheticEvent) => {
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
        <form className={s.main} onSubmit={login}>
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
            <Button htmlType="submit" type="primary" size="medium" >
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

        </form>

    )
}