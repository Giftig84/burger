import React, {FC, FormEventHandler, useEffect} from 'react';
import  s from './Page.module.css'
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileNavigation} from "../components/ProfileNavigation/ProfileNavigation";
import {userSelector} from "../services/selectors/selectors";
import { updateUser} from "../services/actions/userAction";
import { TUser, useAppDispatch, useAppSelector} from "../Types/types";

export  const Profile:FC = () => {
    const user = useAppSelector(userSelector);

    const [userForm, setUserForm] = React.useState<TUser>({
        email: '',
        password: '',
        name: ''
    });

    const dispatch = useAppDispatch();

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

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e: React.SyntheticEvent) =>{
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
                <ProfileNavigation description={"В этом разделе вы можете изменить свои персональные данные"}/>
            </div>

            <form  className = "mt-20" onSubmit={handleSubmit}>
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
                <Button htmlType='submit' size="medium" extraClass="mb-6 mr-6" >Сохранить</Button>
                <Button htmlType="button" size="medium" extraClass="mb-6" onClick={(e) => cancelSubmit(e)}>Отменить</Button>
            </form>

        </div>

    )
}