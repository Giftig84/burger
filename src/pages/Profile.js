import React, {useEffect} from 'react';
import  s from './Page.module.css'
import { Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {ProfileNavigation} from "../components/ProfileNavigation/ProfileNavigation";
import {userSelector} from "../services/selectors/selectors";

export  function  Profile() {
    const user = useSelector(userSelector);
debugger;
    const [userForm, setUserForm] = React.useState({
        email: '',
        password: '',
        name: ''
    });

    const dispatch = useDispatch();


    useEffect(()=>{
        if(user) setUserForm({
            email: user.email,
            password: '',
            name: user.name
        })
    }, [user]);

    const onChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
    });
    };


    return(
        <div className={s.profile}>
            <div className={s.navigation}>
                <ProfileNavigation/>
            </div>

            <div  className = "mt-20">
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={userForm.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={userForm.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={userForm.password}
                    name={'password'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
            </div>

        </div>

    )
}