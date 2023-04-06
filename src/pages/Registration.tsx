import React, {FC} from 'react';
import  s from './Page.module.css'
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import { Navigate , Link } from "react-router-dom";
import {authSelector} from "../services/selectors/selectors";
import {userRegistration} from "../services/actions/userAction";
import {TDispatch, TUser} from "../Types/types";

export  const  Registration:FC = () => {
    const [nameValue, setNameValue] = React.useState<string>('');
    const [emailValue, setEmailValue] = React.useState<string>('');
    const [passValue, setPassValue] = React.useState<string>('');
    const dispatch: TDispatch = useDispatch();
    const isAuth: boolean = useSelector(authSelector);

    const registration = ((e: React.SyntheticEvent) => {
        e.preventDefault();
        const userData: TUser = {
            email: emailValue,
            password: passValue,
            name: nameValue,
        }
        dispatch(userRegistration('/auth/register', userData));
        setEmailValue('');
        setPassValue('');
        setNameValue('');
    });

    if (isAuth) {
        return (
            <Navigate to='/' />
        );
    }
    return(
        <div className={s.main}>
            <div className={s.header +" mt-10 mb-6"}>
                <p className="text text_type_main-medium"> Регистрация </p>
            </div>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                value={nameValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Input
                type={'email'}
                placeholder={'Логин'}
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
            <Button htmlType="submit" type="primary" size="medium" onClick={e => registration(e)}>
                Зарегистрироваться
            </Button>
            <div className={s.bottom + " mt-20 "} >
                <p className="text text_type_main-default text_color_inactive mr-4">Уже зарегистрированы?</p>
                <Link to={{ pathname: `/login` }} className="text text_type_main-default">Войти</Link>
            </div>

        </div>

    )
}