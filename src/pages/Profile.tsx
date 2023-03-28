import React, {FC, useEffect} from 'react';
import  s from './Page.module.css'
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {ProfileNavigation} from "../components/ProfileNavigation/ProfileNavigation";
import {userSelector} from "../services/selectors/selectors";
import { updateUser} from "../services/actions/userAction";
import {TDispatch, TUser} from "../Types/types";

export  const Profile:FC = () => {
    const user: TUser = useSelector(userSelector);

    const [userForm, setUserForm] = React.useState<TUser>({
        email: '',
        password: '',
        name: ''
    });

    const dispatch: TDispatch = useDispatch();

    useEffect(()=>{
        if(user) setUserForm({
            email: user.email,
            password: '',
            name: user.name
        })
    }, [user]);



    const onChange = (e: React.SyntheticEvent) => {
        setUserForm({
            ...userForm,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    });
    };

    const handleSubmit = (e: React.SyntheticEvent) =>{
        e.preventDefault();
        dispatch(updateUser(userForm));
    }

    const cancelSubmit = (e: React.SyntheticEvent) =>{

        e.preventDefault();
        if(user) setUserForm({
            email: user.email,
            password: '',
            name: user.name
        })

    }
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
                <Button htmlType="button" size="medium" extraClass="mb-6 mr-6" onClick={(e) => handleSubmit(e)}>Сохранить</Button>
                <Button htmlType="button" size="medium" extraClass="mb-6" onClick={(e) => cancelSubmit(e)}>Отменить</Button>
            </div>

        </div>

    )
}