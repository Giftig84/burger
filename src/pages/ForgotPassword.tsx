import React, {FC} from 'react';
import s from './Page.module.css'
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useNavigate, Link} from "react-router-dom";
import {BASE_URL} from "../ImportFiles/endPointUrl";
import {checkResponse} from "../Utils/Utils";
import {useDispatch} from "react-redux";

import {USER_FGT_PSW_SUCCESS} from "../services/actions/userAction";
import {TDispatch} from "../Types/types";


export const ForgotPassword:FC =() =>{
    const [email, setEmail] = React.useState<string>('');
    const navigate = useNavigate();
    const dispatch: TDispatch = useDispatch();

    const sendEmail = async function (): Promise<void> {
        if (email) {
            try {
                const parsedResponse = await fetch(BASE_URL + "/password-reset", {
                    body: JSON.stringify({
                        "email": email
                    }),
                    headers: new Headers([
                        ['Content-Type', 'application/json'],
                    ]),
                    method: 'POST',
                }).then(checkResponse);
                if (parsedResponse.success === true) {
                    dispatch({type: USER_FGT_PSW_SUCCESS})
                    navigate('/reset-password');
                }

            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.log('Возникла проблема с отправкой email: ', e.message);
                }

            }
        }

    }
    return (
        <div className={s.main}>
            <div className={s.header + " mt-10 mb-6"}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
            </div>
            <Input
                type={'email'}
                placeholder={'Укажите е-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium" onClick={sendEmail}>
                Восстановить
            </Button>
            <div className={s.bottom + " mt-20 "}>
                <p className="text text_type_main-default text_color_inactive mr-4">Вспомнили пароль?</p>
                <Link to={{pathname: `/login`}} className="text text_type_main-default">Войти</Link>
            </div>
        </div>

    )
}